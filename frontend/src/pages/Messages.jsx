import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../appcontext/Authcontext";
import '../pages/styles/message.css';
import Sidebar from "../components/Sidebar";
import { db, auth } from '../config/Firebase.jsx';
import { collection, addDoc, getDocs, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function Messages() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [showNameList, setShowNameList] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { currentUser } = useAuth();
    const [blurTimeoutId, setBlurTimeoutId] = useState(null);
    const [recentChats, setRecentChats] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => doc.data());
            setUsers(usersList);
        };
    
        fetchUsers();

        const unsubscribeRecentChats = onSnapshot(
            query(collection(db, 'recentChats'), where('userId', '==', auth.currentUser.uid)),
            (snapshot) => {
                if (!snapshot.empty) {
                    const recentUsers = snapshot.docs[0].data().recentUsers;
                    setRecentChats(recentUsers);
                } else {
                    setRecentChats([]);
                }
            },
            (error) => {
                console.error('Error fetching recent chats:', error);
            }
        );
    
        // Clean up the listener when component unmounts
        return () => {
            unsubscribeRecentChats();
        };

    }, []);

    useEffect(() => {
        if (currentUser && currentUser.username) {
            fetchDirectMessages();
        }
    }, [currentUser, selectedUser]);

    

    useEffect(() => {
        let unsubscribe;
    
        if (currentUser && currentUser.username) {
            unsubscribe = fetchDirectMessages();
        }
    
        // Clean up the listener when component unmounts or currentUser changes
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [currentUser]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setShowNameList(e.target.value.trim() !== '');
    };

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        setShowNameList(false);
        setSearch('');
    
        // Add the selected user to recent chats in Firebase
        try {
            const recentChatsRef = collection(db, 'recentChats');
            const querySnapshot = await getDocs(query(recentChatsRef, where('userId', '==', auth.currentUser.uid)));
    
            if (querySnapshot.empty) {
                // If no recent chats document exists for the current user, create a new one
                await addDoc(recentChatsRef, {
                    userId: auth.currentUser.uid,
                    recentUsers: [user],
                });
            } else {
                // If a recent chats document exists, update it with the new recent user
                const docId = querySnapshot.docs[0].id;
                const recentUsers = querySnapshot.docs[0].data().recentUsers;
    
                const updatedRecentUsers = recentUsers.filter(recentUser => recentUser.username !== user.username);
                updatedRecentUsers.unshift(user);
    
                await updateDoc(doc(recentChatsRef, docId), {
                    recentUsers: updatedRecentUsers,
                });
            }
        } catch (error) {
            console.error('Error adding recent user:', error);
        }
    
        // Fetch messages for the selected user
        if (currentUser && user && currentUser.username && user.username) {
            const messagesQuery = query(
                collection(db, 'directMessages'),
                where('users', 'array-contains-any', [currentUser.username, user.username]),
                orderBy('timestamp', 'asc')
            );
            const messagesSnapshot = await getDocs(messagesQuery);
            const fetchedMessages = messagesSnapshot.docs
                .filter(doc => {
                    const messageUsers = doc.data().users;
                    return messageUsers.includes(currentUser.username) && messageUsers.includes(user.username);
                })
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        }
    };

    const handleBlur = () => {
        // Set a timeout to delay the execution of the onBlur event
        const timeoutId = setTimeout(() => {
            setShowNameList(false);
        }, 200); // 200ms should be enough, adjust if needed
    
        setBlurTimeoutId(timeoutId);
    };

    const handleFocus = () => {
        // Clear the timeout if the input field is focused again before the timeout finishes
        clearTimeout(blurTimeoutId);
        setShowNameList(true);
    };

    const fetchDirectMessages = () => {
        if (currentUser && currentUser.username) {
            const messagesRef = collection(db, 'directMessages');
    
            const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
                const fetchedMessages = [];
                snapshot.forEach((doc) => {
                    const messageData = doc.data();
                    if (
                        messageData.users.includes(currentUser.username) &&
                        selectedUser &&
                        messageData.users.includes(selectedUser.username)
                    ) {
                        fetchedMessages.push({ id: doc.id, ...messageData });
                    }
                });
                // Sort the messages by timestamp
                const sortedMessages = fetchedMessages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
                setMessages(sortedMessages);
            });
    
            // Return the unsubscribe function to clean up the listener when component unmounts
            return unsubscribe;
        }
    };
    
    const sendMessage = async () => {
        if (newMessage.trim() === '' || !auth.currentUser || !selectedUser || !currentUser.username || !selectedUser.username) return;
    
        try {
            await addDoc(collection(db, 'directMessages'), {
                text: newMessage,
                timestamp: new Date(),
                users: [currentUser.username, selectedUser.username],
                senderName: currentUser.firstname,
                senderUsername: currentUser.username,
            });
    
            setNewMessage('');
    
            // Update recent chats and store in local storage
            const recentChatsRef = collection(db, 'recentChats');
            const querySnapshot = await getDocs(query(recentChatsRef, where('userId', '==', auth.currentUser.uid)));
    
            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                const recentUsers = querySnapshot.docs[0].data().recentUsers;
    
                const updatedRecentUsers = recentUsers.filter(user => user.username !== selectedUser.username);
                updatedRecentUsers.unshift(selectedUser);
    
                await updateDoc(doc(recentChatsRef, docId), {
                    recentUsers: updatedRecentUsers,
                });
            } else {
                await addDoc(recentChatsRef, {
                    userId: auth.currentUser.uid,
                    recentUsers: [selectedUser],
                });
            }
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const getLatestMessage = (chat) => {
        const chatMessages = messages.filter(
          (message) =>
            message.users.includes(currentUser.username) &&
            message.users.includes(chat.username)
        );
        if (chatMessages.length > 0) {
          const latestMessage = chatMessages[chatMessages.length - 1];
          return latestMessage.text;
        }
        return "";
      };
      

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Messaging</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
            </head>
            <body className="bg-gray-100">
                <div className="flex flex-col md:flex-row h-screen">
                    {/* Sidebar */}
                    <Sidebar />
    
                    {/* Chat List */}
                    <div className="w-full md:w-80 bg-white border-l border-r border-gray-200 p-5 overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <div className="font-semibold text-lg">Chat</div>
                            <div className="text-gray-400">
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearchChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline"
                                    placeholder="Search.."
                                />
                            </div>
                            {showNameList && (
                                <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {users
                                        .filter((user) =>
                                            user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                                            (user.username && user.username.toLowerCase().includes(search.toLowerCase()))
                                        )
                                        .map((filteredUser) => (
                                            <div
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                key={filteredUser.id}
                                                onClick={() => handleUserClick(filteredUser)}
                                            >
                                                {filteredUser.firstname} {filteredUser.username ? `(${filteredUser.username})` : ''}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                        <div>
                        <div className="font-medium text-gray-600 mb-2">Recent</div>
                        <div className="space-y-4">
                            {recentChats.map(chat => {
                                const chatMessages = messages.filter(
                                    (message) =>
                                        message.users.includes(currentUser.username) &&
                                        message.users.includes(chat.username)
                                );
                                const latestMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;

                                return (
                                    <div
                                        key={chat.username}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded-md"
                                        onClick={() => handleUserClick(chat)}
                                    >
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                            alt="Profile"
                                            className="h-12 w-12 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium">{chat.firstname} ({chat.username})</div>
                                            <div className="text-xs text-gray-500">
                                                {latestMessage ? new Date(latestMessage.timestamp.seconds * 1000).toLocaleString() : ''}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    </div>
    
                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col">
                        <div className="p-5 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center space-x-3">
                                    <div className="font-semibold text-lg">{selectedUser ? selectedUser.firstname : 'Select a user'}</div>
                                    <div className="text-sm text-gray-400">Chat</div>
                                </div>
                                <div className="text-gray-400">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            {selectedUser ? (
                                <div className="flex flex-col space-y-4">
                                {messages
                                    .filter(message =>
                                    message.users.includes(currentUser.username) &&
                                    message.users.includes(selectedUser.username)
                                    )
                                    .map(message => (
                                    <div key={message.id} className={`flex space-x-2 ${message.senderUsername === currentUser.username ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <img
                                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                        />
                                        <div className={`px-4 py-2 rounded-lg ${message.senderUsername === currentUser.username ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                        <div className="message-text">
                                            {message.text.split(' ').map((word, index) => {
                                            if (word.startsWith('http://') || word.startsWith('https://')) {
                                                return (
                                                <a
                                                    key={index}
                                                    href={word}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-yellow-400 hover:underline"
                                                >
                                                    {word}{' '}
                                                </a>
                                                );
                                            }
                                            return word + ' ';
                                            })}
                                        </div>
                                        <div className="text-xs mt-1">{new Date(message.timestamp.seconds * 1000).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    ))
                                }
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">Select a user to start messaging</div>
                            )}
                            </div>
                        {selectedUser && (
                            <div className="p-5 border-t border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="text-gray-400 focus:outline-none" onClick={sendMessage}>
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}