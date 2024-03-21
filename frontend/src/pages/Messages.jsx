import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../appcontext/Authcontext";
import { useNavigate } from "react-router-dom";
import '../pages/styles/message.css';
import Sidebar from "../components/Sidebar";
import { db, storage, auth } from '../config/firebase.jsx';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';


export default function Messages (){
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [showNameList, setShowNameList] = useState(false);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => doc.data());
            setUsers(usersList);
        };
    
        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setShowNameList(e.target.value !== '');
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
                                    onFocus={() => setShowNameList(true)}
                                    onBlur={() => setShowNameList(false)}
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline"
                                    placeholder="Search.."
                                />
                            </div>
                            {showNameList && (
                                <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {users
                                        .filter((user) =>
                                            user.firstname.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .map((filteredUser) => (
                                            <div
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                key={filteredUser.id}

                                            >
                                                {filteredUser.firstname}
                                            </div>
                                        ))}
                                </div>
                            )}
                            <div className="mt-2">
                                <div className="font-medium text-gray-600 mb-2">Pinned</div>
                                <div className="text-sm space-y-1">
                                    {/* Pinned content */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-medium text-gray-600 mb-2">Recent</div>
                            <div className="text-sm space-y-1">
                                {/* Recent content */}
                            </div>
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col">
                        <div className="p-5 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center space-x-3">
                                    <div className="font-semibold text-lg">Marie Beaudouin</div>
                                    <div className="text-sm text-gray-400">Chat</div>
                                    <div className="text-sm text-gray-400">Files</div>
                                </div>
                                <div className="text-gray-400">
                                    <i className="fas fa-ellipsis-v"></i>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-5 overflow-y-auto">
                            <div className="flex flex-col space-y-4 mb-5">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Profile picture of Marie Beaudouin"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>5/12, 9:15 AM</div>
                                        <div>
                                            Hi Marie, I just read your report you sent to me yesterday
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Your profile picture"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>5/12, 9:15 AM</div>
                                        <div>
                                            I've scheduled our team meeting for Thursday at 10 AM. Let me
                                            know if that works for you
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Profile picture of Marie Beaudouin"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>5/12, 9:15 AM</div>
                                        <div>
                                            Also, can we discuss the Q3 budget during the meeting?
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Your profile picture"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>5/12, 9:15 AM</div>
                                        <div>
                                            Need to prepare for the worst, never know how might meeting go
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Profile picture of Marie Beaudouin"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>Marie Beaudouin</div>
                                        <div>11:14 AM</div>
                                        <div>
                                            Definitely, I'll put it on the agenda. Thanks for the heads
                                            up!
                                        </div>
                                        <div>
                                            Regarding Thursday's meeting, should we invite the B team as
                                            well?
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://placehold.co/40x40"
                                        alt="Your profile picture"
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <div>5/12, 9:15 AM</div>
                                        <div>Are you available now?</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="text-gray-400 focus:outline-none">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
};
