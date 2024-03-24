import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import { db, auth } from '../config/Firebase.jsx';
import { updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';


export default function Groups() {
    const [userGroups, setUserGroups] = useState([]);
    const { currentUser } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const groupsRef = collection(db, 'groups');
                const createdByQuery = query(groupsRef, where('groupCreatedBy', '==', auth.currentUser.uid));
                const memberOfQuery = query(groupsRef, where('groupMembers', 'array-contains', currentUser.username));
                
                const [createdBySnapshot, memberOfSnapshot] = await Promise.all([
                    getDocs(createdByQuery),
                    getDocs(memberOfQuery)
                ]);
                
                const groups = new Map();
                createdBySnapshot.forEach((doc) => {
                    groups.set(doc.id, { ...doc.data(), groupId: doc.id });
                });
                memberOfSnapshot.forEach((doc) => {
                    groups.set(doc.id, { ...doc.data(), groupId: doc.id }); // This ensures no duplicates and includes groupId
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
    
    const deleteGroup = async (groupId) => {
        if (!window.confirm("Are you sure you want to delete this group?")) return;
        try {
            await deleteDoc(doc(db, 'groups', groupId));
            setUserGroups(userGroups.filter(group => group.groupId !== groupId)); // Now correctly filters out the deleted group
            toast({
                title: 'Group deleted',
                description: 'The group has been successfully deleted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error deleting group: ", error);
            toast({
                title: 'Error deleting group',
                description: 'An error occurred while trying to delete the group.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
   

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-grow px-6 py-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">My Groups:</h1>
                    <button onClick={() => window.location.href = '/create'} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">Create/Join Group</button>
                </div>
                {userGroups.length === 0 ? (
                    <div className="flex justify-center h-full">
                        <h1 className="text-sm font-regular">No groups found</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {userGroups.map((group) => (
                            <div key={group.groupId} className="bg-white rounded-lg shadow p-4">
                                <img src={group.groupCover || "https://placehold.co/300x200"} alt="Group" className="rounded-lg" style={{ maxWidth: "300px", maxHeight: "200px" }} />
                                <div className="mt-4">
                                    <div className="font-semibold">{group.groupName}</div>
                                    <div className="text-sm text-gray-500">Meeting in progress..</div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={() => window.location.href = `/group/${group.groupId}`} className="text-blue-500 hover:text-blue-600">View</button>
                                    <button onClick={() => deleteGroup(group.groupId)} className="text-red-500 hover:text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-64">
                <NotificationBar />
            </div>
        </div>
    );
}

