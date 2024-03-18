import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where, getDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../config/Firebase.jsx';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext.jsx';
import { useToast } from "@chakra-ui/react";

export default function Files() {
    const { groupId } = useParams(); // Get groupId from URL
    const [group, setGroup] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

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
                    navigate('/groups');
                }
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };
        fetchGroup();

    }, [groupId, navigate]);

    return (
        <body className="bg-gray-100">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">

                    <div className="flex justify-between items-center p-4 bg-white border-b">
                        <div className="flex space-x-4">
                            <button className="text-gray-500 md:hidden" onClick={() => toggleSidebar()}>
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="text-gray-800 font-bold">{group && group.groupName}</div> {/* Display group name */}
                            <div className= "text-gray-500" onClick={() => navigate(`/group/${groupId}`)}>General</div>
                            <div className="text-gray-500">Live Collaboration</div>
                            <div className="text-gray-500">Post</div>
                            <div className="text-gray-500">File</div>
                            <div className="text-gray-500">Members</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input type="text" className="border rounded px-2 py-1" placeholder="Search" />
                                <i className="fas fa-search absolute right-2 top-2 text-gray-400"></i>
                            </div>
                            <i className="fas fa-video custom-icon" onClick={() => window.open('/zego')}></i>
                            <i className="fas fa-cog text-gray-600"></i>
                            <i className="fas fa-bell text-gray-600"></i>
                        </div>
                    </div>
                    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-4 py-4">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Group Files
                            </h3>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Upload
                            </button>
                        </div>
                        <div class="px-4 py-5 sm:p-0">
                            <dl>
                                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Files
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                                        <div class="flex items-center justify-between py-2">
                                            <div class="flex items-center">
                                                <i class="fas fa-folder text-yellow-500 mr-2"></i>
                                                <span>File Name</span>
                                            </div>
                                            <div class="flex items-center">
                                                <span class="mr-6">35,4 мб</span>
                                                <span class="mr-6">12.02.2022</span>
                                                <i class="fas fa-ellipsis-v text-gray-500"></i>
                                            </div>
                                        </div>

                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                </div>
            </div>


                </div>

            </div>
        </body>
        
    )
    
}