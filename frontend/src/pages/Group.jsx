import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase.jsx';
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
    }, []);

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
                            <div class="font-semibold text-lg">{group && group.groupName}</div> {/* Display group name */}
                            <div class="text-gray-500">Live Collaboration</div>
                            <div class="text-gray-500">Post</div>
                            <div class="text-gray-500">File</div>
                            <div class="text-gray-500">Members</div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="relative">
                                <input type="text" class="border rounded px-2 py-1" placeholder="Search" />
                                <i class="fas fa-search absolute right-2 top-2 text-gray-400"></i>
                            </div>
                            <i class="fas fa-video custom-icon" onClick={() => window.open('/zego')}></i>
                            <i class="fas fa-cog text-gray-600"></i>
                            <i class="fas fa-bell text-gray-600"></i>
                        </div>
                    </div>


                    <div class="flex-1 flex flex-col">

                        <div class="flex-1 p-4 overflow-y-auto">
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">KJ</div>
                                <div>
                                    <div class="text-sm font-semibold">Kennedy, John</div>
                                    <div class="text-xs text-gray-500">Yesterday 8:46 pm</div>
                                </div>
                            </div>
                            <p class="mb-4">Hello everyone, let's have a meeting tomorrow.</p>
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="rounded-full bg-green-500 text-white w-8 h-8 flex items-center justify-center">JB</div>
                                <div>
                                    <div class="text-sm font-semibold">Bouvier, Jacqueline</div>
                                    <div class="text-xs text-gray-500">Yesterday 8:50 pm</div>
                                </div>
                            </div>
                            <p>Sure, let's meet tomorrow.</p>

                        </div>


                        <div class="border-t p-4 flex items-center space-x-3">
                            <button class="text-gray-500 focus:outline-none">
                                <i class="fas fa-paperclip"></i>
                            </button>
                            <input type="text" class="flex-1 border rounded px-2 py-1" placeholder="Type a new message" />
                            <button class="bg-blue-500 text-white rounded px-4 py-1 focus:outline-none">Send</button>
                        </div>
                    </div>
                </div>
            </div>

        </body>



    )
}
