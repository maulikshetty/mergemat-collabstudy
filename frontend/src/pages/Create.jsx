import React from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import { useState, useEffect } from 'react';
import { db, auth, storage } from '../config/Firebase.jsx';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../components/NotificationContext';


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
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [fileUploadStatus, setFileUploadStatus] = useState(''); // New state for file upload status

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
        const value = e.target.value;
        setSearch(value);
        setShowNameList(value !== '');
        const filteredUsers = users.filter(user =>
            user.firstname.toLowerCase().includes(value.toLowerCase())
        );
        setVisibleUsers(filteredUsers);
    };
    const addUserToGroup = (user) => {
        console.log("Adding user to group:", user); // Debugging line
        setGroupMembers(prevMembers => {
            if (!prevMembers.find(member => member.username === user.username)) {
                const updatedMembers = [...prevMembers, { firstname: user.firstname, username: user.username }];
                setShowNameList(false); // Hide the dropdown
                setSearch(''); // Clear the search bar input
                return updatedMembers;
            }
            return prevMembers;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileUploadStatus(file ? `${file.name} uploaded` : ''); // Update upload status
    };
    const { addNotification } = useNotifications(); // Hook from your NotificationContext

    const handleCreateGroup = async () => {
        if (!groupName || groupMembers.length === 0) {
            toast({
                title: 'Error',
                description: 'Please provide a group name and select at least one member.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        
        const groupId = generateGroupId(); // Generate a unique group id
        const groupData = {
            groupId: groupId,
            groupName: groupName,
            groupMembers: groupMembers.map(member => member.username),
            groupCreatedBy: auth.currentUser.uid
        };
    
        try {
            // Create the group document in Firestore
            const groupRef = await addDoc(collection(db, 'groups'), groupData);
            console.log('Group created with ID: ', groupRef.id);
    
            let downloadURL = '';
            if (file) {
                const storageRef = ref(storage, `groupPictures/${groupRef.id}/${file.name}`);
                await uploadBytes(storageRef, file);
                downloadURL = await getDownloadURL(storageRef);
                console.log('Picture uploaded with URL: ', downloadURL);
    
                // Update the group document with the cover image URL
                await updateDoc(doc(db, 'groups', groupRef.id), {
                    groupCover: downloadURL
                });
                
        
            }
            await addNotification(`New group created: ${groupName}`);
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

    const generateGroupId = () => {
        // Generate a unique group id using a combination of timestamp and random number
        const timestamp = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * 10000).toString();
        return timestamp + randomNumber;
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
                        <div className="grid grid-cols-1 gap-2">
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
                                        // onBlur={() => setShowNameList(false)}
                                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline"
                                        placeholder="Search.."
                                    />
                                    {/* Allow searching for users and adding multiple users here */}
                                    {
                                        showNameList && (
                                            <div className="absolute z-10 bg-white mt-1 rounded-md shadow-lg w-full">
                                                {visibleUsers.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => addUserToGroup(user)}
                                                    >
                                                        {user.firstname} ({user.username})
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                    <div className="mt-4">
                                        <h3 className="text-gray-700">Selected Members:</h3>
                                        {groupMembers.length === 0 ? (
                                            <p className="text-red-500">Please select at least one user.</p>
                                        ) : (
                                            <ul>
                                                {groupMembers.map((member, index) => (
                                                    <li key={index} className="p-2 border rounded mt-2">
                                                        {member.firstname}
                                                        {/* Optionally add a button to remove a member */}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </label>
                            <label className="block cursor-pointer">
                                <span className="text-gray-700">Upload Picture</span>
                                <div className="mt-1 block w-full rounded-md border-2 border-dashed border-gray-300 p-6 text-center">
                                    <i className="fas fa-cloud-upload-alt fa-3x text-gray-300"></i>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </div>
                                {/* Display file upload status here */}
                                {fileUploadStatus && <p className="text-green-500">{fileUploadStatus}</p>}
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

