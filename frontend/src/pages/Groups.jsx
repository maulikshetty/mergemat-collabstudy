import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import { db, auth } from '../config/Firebase.jsx';
import { updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import './styles/grouppage.css';

export default function Groups() {
    const [userGroups, setUserGroups] = useState([]);
    const { currentUser } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const groupsRef = collection(db, 'groups');
                // Query for groups created by the user
                const createdByQuery = query(groupsRef, where('groupCreatedBy', '==', auth.currentUser.uid));
                // Query for groups where the user is a member
                const memberOfQuery = query(groupsRef, where('groupMembers', 'array-contains', currentUser.username));
                
                // Get documents for both queries
                const [createdBySnapshot, memberOfSnapshot] = await Promise.all([
                    getDocs(createdByQuery),
                    getDocs(memberOfQuery)
                ]);
                
                // Combine and map documents to data
                const groups = new Map();
                createdBySnapshot.forEach((doc) => {
                    groups.set(doc.id, doc.data());
                });
                memberOfSnapshot.forEach((doc) => {
                    groups.set(doc.id, doc.data()); // This ensures no duplicates
                });
                
                setUserGroups(Array.from(groups.values()));
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to fetch user groups',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
    
        fetchUserGroups();
    }, [currentUser.uid, currentUser.username, toast]);
    

    return (
        <div>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                {/* Left sidebar */}
                <Sidebar />

                {/* Main content */}
                
                <div className="flex-grow px-6 py-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">My Groups:</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => window.location.href = '/create'}>Create/Join Group</button>
                    </div>
                    {userGroups.length === 0 && (
                        <div className="flex justify-center h-full">
                            <h1 className="text-sm font-regular">No groups found</h1>
                        </div>
)}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {/* Group cards */}
                {userGroups.map((group) => (
                    <div className="bg-white rounded-lg shadow p-4 group-card">
                    <img
                        src={group.groupCover || "https://t3.ftcdn.net/jpg/05/70/39/62/360_F_570396261_Jx0zuuyBcBwQg0WHDXdnfm6cgQ3BmlEc.jpg"}
                        alt="Group of people working together illustration"
                        className="rounded-lg object-cover w-full h-48"
                    />
                    <div className="mt-4">
                        <div className="font-semibold">{group.groupName}</div>
                        <div className="text-sm text-gray-500">Collaborate with your group</div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                        <img src="https://www.svgrepo.com/show/90343/multiple-user-profile-images.svg" alt="Group icon" className="h-8 w-8 rounded-full" />
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">New</span>
                        </div>
                        <button className="text-blue-500 hover:text-blue-600" onClick={() => window.location.href = `/group/${group.groupId}`}>View</button>
                    </div>
                    </div>
                ))}
                </div>
                </div>

                {/* Right sidebar */}
                <div className="w-64">
                    {/* Adjust width as needed */}
                    <NotificationBar />
                </div>
            </div>
        </div>
    );
};
