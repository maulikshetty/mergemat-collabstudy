import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where, getDoc, doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
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
    const [usernameInput, setUsernameInput] = useState('');

    const leaveGroup = async () => {
        if (window.confirm("Are you sure you want to leave this group?")) {
            try {
                // Create a query to fetch the group by groupId
                const groupQuery = query(collection(db, 'groups'), where('groupId', '==', groupId));
                const groupSnapshot = await getDocs(groupQuery);
    
                if (!groupSnapshot.empty) {
                    // Get the group document
                    const groupDoc = groupSnapshot.docs[0];
                    const groupData = groupDoc.data();
    
                    // Check if the current user is the creator of the group
                    if (auth.currentUser.uid === groupData.groupCreatedBy) {
                        console.error("Error: Group creator cannot leave the group.");
                        toast({
                            title: "You cannot leave the group.",
                            description: "As the admin, you cannot leave the group.",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                        return;
                    }
    
                    // Update the members array to remove the current user's username
                    await updateDoc(groupDoc.ref, {
                        groupMembers: arrayRemove(currentUser.username)
                    });
    
                    toast({
                        title: "Action Complete",
                        description: "You have left the group. Contact the admin to be added back.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    console.log(`No group with groupId: ${groupId}`);
                }
            } catch (error) {
                console.error("Error leaving group: ", error);
            }
        }
    };
    
    

    const addMember = async (username) => {
        try {
            // Check if the username exists in the users collection
            const userQuery = query(collection(db, 'users'), where('username', '==', username));
            const userSnapshot = await getDocs(userQuery);

            if (userSnapshot.empty) {
                console.log(`No user with username: ${username}`);
                toast({
                    title: "Error adding member.",
                    description: `No user with username: ${username}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            // Get the user's first name
            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();
            const firstname = userData.firstname;

            // Check if the user is already a member of the group
            const groupQuery = query(collection(db, 'groups'), where('groupId', '==', groupId));
            const groupSnapshot = await getDocs(groupQuery);

            if (!groupSnapshot.empty) {
                const groupDoc = groupSnapshot.docs[0];
                const groupData = groupDoc.data();

                if (groupData.groupMembers.includes(username)) {
                    console.log(`${username} is already a member of the group`);
                    toast({
                        title: "Error adding member.",
                        description: `${username} is already a member of the group`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return;
                }

                const groupRef = doc(db, 'groups', groupDoc.id);

                await updateDoc(groupRef, {
                    groupMembers: arrayUnion(username)
                });

                // Only update the members state and show the toast when the member is successfully added to Firestore
                setMembers([...members, `${firstname} (${username})`]);

                toast({
                    title: "Member added.",
                    description: `${username} was added to the group.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.log(`No group with groupId: ${groupId}`);
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const removeMember = async (fullname) => {
        try {
            const username = fullname.split(' ').pop().slice(1, -1); // Extract username from fullname

            const groupQuery = query(collection(db, 'groups'), where('groupId', '==', groupId));
            const groupSnapshot = await getDocs(groupQuery);

            if (!groupSnapshot.empty) {
                const groupDoc = groupSnapshot.docs[0]; // Get the first document that matches the query
                const groupRef = doc(db, 'groups', groupDoc.id); // Use the actual document ID

                await updateDoc(groupRef, {
                    groupMembers: arrayRemove(username)
                });
                setMembers(members.filter(member => member !== fullname));

                // Show toast notification
                toast({
                    title: "Member removed.",
                    description: `${username} was removed from the group.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.log(`No group with groupId: ${groupId}`);
            }
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

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
                        <div class="text-gray-500 cursor-pointer">Live Collaboration</div>
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

                    <div className="flex items-center p-4 space-x-4">
                        <form className="relative" onSubmit={(e) => { e.preventDefault(); addMember(usernameInput); }}>
                            <label htmlFor="addMember" className="sr-only">Add member</label>
                            <input 
                                type="text" 
                                id="addMember"
                                className="border rounded px-2 py-2 mr-2" 
                                placeholder="Enter username.." 
                                value={usernameInput} 
                                onChange={(e) => setUsernameInput(e.target.value)} 
                            />
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none">
                                Add Member 
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col p-4">
                        <h2 className="text-2xl font-semibold mb-4">Group Members</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            {members.map((member, index) => (
                                <li key={index} className="bg-white p-4 shadow rounded relative">
                                    <div className="font-semibold">{member}</div>
                                    {group && group.groupCreatedBy === auth.currentUser.uid && (
                                        <button onClick={() => removeMember(member)} className="text-red-500 focus:outline-none absolute top-4 right-4">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col p-4">
                        <h2 className="text-2xl font-semibold mb-4">Group Admin</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            <li className="bg-white p-4 shadow rounded">
                                <div className="font-semibold">{adminName}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 flex flex-col p-4">
                        <h2 className="text-2xl font-semibold mb-4">Notice</h2>
                        <p className="text-lg mb-4">Only the group admin can remove members.</p>
                        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
                        <ul>
                            <li className="mb-2">
                                <h3 className="font-semibold">Who can remove members from the group?</h3>
                                <p>Only the group admin can remove members from the group.</p>
                            </li>
                            <li className="mb-2">
                                <h3 className="font-semibold">How to delete a group</h3>
                                <p>The group admin should contact us with the reason, and we will proceed with the process</p>
                            </li>
                            <li className="mb-2">
                                <h3 className="font-semibold">How do I report an admin </h3>
                                <p>Please contact us through email with your concern and we will take action if needed</p>
                            </li>
                            <li className="mb-2">
                                <h3 className="font-semibold">Can I ban users from the chat</h3>
                                <p>Currently you cannot mute or ban a user, If you wish you could remove the user as an admin.</p>
                            </li>
                            <button style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer'  }} onClick={leaveGroup}>
                            Leave Group
                            </button>
                            {/* Add additional FAQs here */}
                        </ul>
                    </div>
                </div>

            </div>
        </body>
    );
};