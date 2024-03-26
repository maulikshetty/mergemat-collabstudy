import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where, addDoc, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/Firebase.jsx';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from "@chakra-ui/react";

export default function Group() {
    const { groupId } = useParams(); // Get groupId from URL
    const [group, setGroup] = useState(null);
    const { currentUser } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [hasShownToast, setHasShownToast] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {

        console.log('Group component rendered'); // Add this line



        const fetchGroup = async () => {
            try {
                const groupQuery = query(collection(db, 'groups'), where('groupId', '==', groupId)); // Query groups where groupId equals the groupId from URL
                const groupSnapshot = await getDocs(groupQuery); // Execute the query
        
                if (!groupSnapshot.empty) {
                    const groupDoc = groupSnapshot.docs[0]; // Get the first (and should be the only) document that matches the query
                    const groupData = groupDoc.data(); // Get the group data
                    
                    // Check if the current user is authorized to access the group
                    if (groupData.groupCreatedBy === auth.currentUser.uid || groupData.groupMembers.includes(currentUser.username)) {
                        setGroup(groupData); // Set the group data
                        console.log('Group ID:', groupId);
                        console.log('Group Name:', groupData.groupName);
                    } else {
                        if (!hasShownToast) { // Add this line
                            toast({
                                title: "Access Denied",
                                description: "You don't have access to this group.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            setHasShownToast(true); // And this line
                        }
                        navigate('/groups');
                    }
                } else {
                    console.log('No such group!');
                }
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };
        fetchGroup();

        const fetchMessages = async () => {
            const messagesQuery = query(collection(db, 'groups', groupId, 'messages'), orderBy('timestamp', 'asc'));
            const messagesSnapshot = await getDocs(messagesQuery);
            setMessages(messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchMessages();
    
        // Listen to new messages
        const messagesQuery = query(collection(db, 'groups', groupId, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const fetchedMessages = [];
            snapshot.docs.forEach(doc => {
                fetchedMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(fetchedMessages);
        });
        return unsubscribe;
        
    }, [groupId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async () => {
        if (newMessage.trim() === '') return;
    
        await addDoc(collection(db, 'groups', groupId, 'messages'), {
            text: newMessage,
            timestamp: new Date(), // Use serverTimestamp() if possible for consistency
            user: currentUser.username,
        });
    
        setNewMessage('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            await deleteDoc(doc(db, 'groups', groupId, 'messages', messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
    

    return (
        <body class="bg-gray-100">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <div class="flex flex-col md:flex-row h-screen">
                <Sidebar />

                <div class="flex-1 flex flex-col overflow-hidden">

                <div class="flex justify-between items-center p-4 bg-white border-b">
                    <div class="flex space-x-4">
                        <button class="text-gray-500 md:hidden" onclick="toggleSidebar()">
                        <i class="fas fa-bars"></i>
                        </button>
                        <div class="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-users text-gray-800 text-lg"></i>
                            <span className="font-semibold text-lg">{group && group.groupName}</span>
                        </div>
                        <div class="text-gray-500 cursor-pointer" onClick={() => navigate(`/group/${groupId}`)}>General</div>
                        <div class="text-gray-500 cursor-pointer" onClick={() => navigate(`/group/${groupId}/contenteditor`)}>Live Collaboration</div>
                        <div class="text-gray-500 cursor-pointer" onClick={() => navigate(`/group/${groupId}/files`)}>File</div>
                        <div class="text-gray-500 cursor-pointer" onClick={() => navigate(`/group/${groupId}/members`)}>Members</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                        <input type="text" class="border rounded px-2 py-1" placeholder="Search" />
                        <i class="fas fa-search absolute right-2 top-2 text-gray-400"></i>
                        </div>
                        <i class="fas fa-video custom-icon" onClick={() => window.open('/zego')}></i>
                        <i class="fas fa-cog text-gray-600 cursor-pointer"></i>
                        <i class="fas fa-bell text-gray-600 cursor-pointer"></i>
                    </div>
                    </div>


                    <div class="flex-1 flex flex-col">

                    <div class="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '82vh' }}>
                    {messages.length === 0 ? (
                        <div class="text-center text-gray-500 mt-8">
                            Be the first to message the group!
                        </div>
                    ) : (
                        messages.map(message => (
                            <div class="flex items-start space-x-2 mb-4">
                                <div class="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">{message.user[0]}</div>
                                <div class="flex-grow">
                                    <div class="text-sm font-semibold">{message.user}</div>
                                    <div class="text-xs text-gray-500">{message.timestamp ? new Date(message.timestamp.seconds * 1000).toLocaleString() : 'Loading...'}</div>
                                    <p class="mb-4">
                                        {message.text.includes('http://') || message.text.includes('https://') ? (
                                            <a href={message.text} target="_blank" rel="noopener noreferrer" class="text-blue-500">{message.text}</a>
                                        ) : (
                                            message.text
                                        )}
                                    </p>
                                </div>
                                {message.user === currentUser.username && (
                                    <div class="flex-none">
                                        <button onClick={() => deleteMessage(message.id)} class="text-red-500 focus:outline-none">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

        <div class="border-t p-4 flex items-center space-x-3">
            <button class="text-gray-500 focus:outline-none">
                <i class="fas fa-paperclip"></i>
            </button>
            <input type="text" class="flex-1 border rounded px-2 py-1" placeholder="Type a new message" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleKeyDown} />
            <button class="bg-blue-500 text-white rounded px-4 py-1 focus:outline-none" onClick={sendMessage}>Send</button>
        </div>
                    </div>
                </div>
            </div>

        </body>



    )
}
