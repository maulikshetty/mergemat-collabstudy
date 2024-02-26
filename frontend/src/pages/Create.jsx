import React from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import { useState, useEffect } from 'react';
import { db, auth, storage } from '../config/firebase.jsx';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function CreateGRP() {
    const toast = useToast();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [showNameList, setShowNameList] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupCreatedBy, setGroupCreatedBy] = useState('');
    const [file, setFile] = useState(null);

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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCreateGroup = async () => {
        const groupData = {
            groupName: groupName,
            groupMembers: groupMembers,
            groupCreatedBy: auth.currentUser.uid,
        };
    
        try {
            const groupRef = await addDoc(collection(db, 'groups'), groupData);
            console.log('Group created with ID: ', groupRef.id);

            if (file) {
                const storageRef = ref(storage, `groupPictures/${groupRef.id}/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Picture uploaded with URL: ', downloadURL);
            }

            toast({
                title: 'Group Created',
                description: `Group created with name: ${groupName}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/groups'); // Redirect to '/groups' after showing the toast
        } catch (error) {
            console.error('Error creating group: ', error);
            toast({
                title: 'Error',
                description: 'Failed to create group',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    
    return (
        <div className="flex h-screen responsive-wrap">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden  bg-gray-100">


                {/* Main Panel */}
                <div className="flex-grow overflow-auto p-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Create Group</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Group Name:</span>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border border-gray-200 h-10 px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                                    placeholder="Name of group"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Add Members</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={handleSearchChange}
                                        // onFocus={() => setShowNameList(true)}
                                        onBlur={() => setShowNameList(false)}
                                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline"
                                        placeholder="Search.."
                                    />
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
                                                        onClick={() => setGroupMembers([...groupMembers, filteredUser])}
                                                    >
                                                     {filteredUser.firstname} ({filteredUser.username})
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </label>
                            <label className="block cursor-pointer">
                                <span className="text-gray-700">Upload Picture</span>
                                <div className="mt-1 block w-full rounded-md border-2 border-dashed border-gray-300 p-6 text-center">
                                    <i className="fas fa-cloud-upload-alt fa-3x text-gray-300"></i>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </div>
                            </label>
                            <button className="bg-gray-800 text-white rounded-md px-4 py-2" onClick={handleCreateGroup}>Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-64'>
            <NotificationBar />
            </div>
        </div>
    );
}

export default CreateGRP;
