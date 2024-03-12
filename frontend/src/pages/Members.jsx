import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/Firebase.jsx';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext.jsx';
import { useToast } from "@chakra-ui/react";

export default function Members() {
    const { groupId } = useParams(); // Get groupId from URL
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const toast = useToast();
    const [hasShownToast, setHasShownToast] = useState(false);
    const [adminName, setAdminName] = useState('');

    
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

        const fetchMembers = async () => {
            try {
                const groupQuery = query(collection(db, 'groups'), where('groupId', '==', groupId)); // Query groups where groupId equals the groupId from URL
                const groupSnapshot = await getDocs(groupQuery); // Execute the query

                if (!groupSnapshot.empty) {
                    const groupDoc = groupSnapshot.docs[0]; // Get the first (and should be the only) document that matches the query
                    const groupData = groupDoc.data(); // Get the group data

                    // Fetch member data
                    const memberData = await Promise.all(groupData.groupMembers.map(async (username) => {
                        try {
                            const userQuery = query(collection(db, 'users'), where('username', '==', username)); // Query users where username equals the current username
                            const userSnapshot = await getDocs(userQuery); // Execute the query

                            if (!userSnapshot.empty) {
                                const userDoc = userSnapshot.docs[0]; // Get the first (and should be the only) document that matches the query
                                const userData = userDoc.data(); // Get the user data
                                return `${userData.firstname} (${username})`;
                            } else {
                                console.log('No such user:', username);
                                return username;
                            }
                        } catch (error) {
                            console.error('Error fetching user:', error);
                            return username;
                        }
                    }));

                    setMembers(memberData); // Set the members data

                    // Fetch admin data
                    const adminDoc = await getDoc(doc(db, 'users', groupData.groupCreatedBy));
                    if (adminDoc.exists()) {
                        const adminData = adminDoc.data();
                        setAdminName(`${adminData.firstname} (${adminData.username})`); // Set the admin's name and username
                    } else {
                        console.log('No such admin!');
                    }
                } else {
                    console.log('No such group!');
                    navigate('/groups'); // Redirect to groups page
                }
            } catch (error) {
                console.error('Error fetching group:', error);
                navigate('/groups'); // Redirect to groups page
            }
        };
        fetchMembers();
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

                    <div className="flex flex-col p-4">
                        <h2 className="text-2xl font-semibold mb-4">Group Members</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            {members.map((member, index) => (
                                <li key={index} className="bg-white p-4 shadow rounded">
                                    <div className="font-semibold">{member}</div>
                                    {/* Add additional member information here */}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 flex flex-col p-4">
                        <h2 className="text-2xl font-semibold mb-4">Group Admin</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            <li className="bg-white p-4 shadow rounded">
                                <div className="font-semibold">{adminName}</div>
                            </li>
                            {/* Add additional admin information here */}
                        </ul>
                    </div>
                </div>
            </div>
        </body>
    );
};
