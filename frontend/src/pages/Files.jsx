import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where, getDoc, doc, updateDoc, arrayRemove, arrayUnion, setDoc } from 'firebase/firestore';
import { db, auth } from '../config/Firebase.jsx';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, list } from 'firebase/storage'; // Import listAll function
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext.jsx';
import { useToast } from "@chakra-ui/react";

export default function Files() {
    const { groupId } = useParams(); // Get groupId from URL
    const [group, setGroup] = useState(null);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState(null); // State for the file
    const storage = getStorage(); // Get a reference to the storage service
    const [files, setFiles] = useState([]);
    const toast = useToast();
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [buttonText, setButtonText] = useState('Upload');
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = () => {
        if (buttonText === 'Upload') {
            // If the button text is 'Upload', trigger the file input
            fileInputRef.current.click();
        } else {
            // If the button text is 'Confirm Upload', upload the file
            setIsLoading(true); // Set loading to true before starting the upload
            handleFileUpload();
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the state when a file is selected
        setButtonText('Confirm Upload'); // Change the button text to 'Confirm Upload'
    };

    const fetchFiles = async () => {
        const filesQuery = query(collection(db, 'files'), where('groupId', '==', groupId)); // Query files where groupId equals the groupId from URL
        const filesSnapshot = await getDocs(filesQuery); // Execute the query

        // Get the data for each file
        const filesData = filesSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                name: data.name,
                url: data.url,
                uploadedBy: data.uploadedBy,
                uploadDate: data.uploadDate ? data.uploadDate.toDate().toDateString() : '' // Convert Firestore timestamp to JavaScript Date object
            };
        });

        setFiles(filesData); // Update the state with the fetched files
    };
    const handleFileUpload = async () => {
        const storageRef = ref(storage, 'files/' + file.name); // Create a storage reference
        const uploadTask = uploadBytesResumable(storageRef, file); // Create a task to upload the file

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error("Upload failed:", error);
                setIsLoading(false);
            },
            async () => {
                // Handle successful uploads on complete
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);

                // Store the file information in Firestore
                const fileDoc = doc(db, 'files', file.name);
                await setDoc(fileDoc, {
                    name: file.name,
                    url: downloadURL,
                    uploadedBy: currentUser.firstname, // Assuming the user's first name is stored in currentUser.firstName
                    uploadDate: new Date(), // Store the current date and time
                    groupId: groupId // Store the groupId
                });

                // Add a toast notification
                toast({
                    title: "File uploaded.",
                    description: "Your file has been successfully uploaded.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Reset the file input
                setFile(null);

                // Refresh the files
                await fetchFiles();
                setButtonText('Upload');
                setIsLoading(false);
            }
        );
    }

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
        fetchFiles();

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
                    <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div class="container mx-auto px-4 py-4">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        Group Files
                    </h3>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} value={file ? undefined : ''} style={{ display: 'none' }} />
                    <button onClick={handleButtonClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? 'Uploading...' : buttonText}
                    </button>
                </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        File Name
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Uploaded By
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Uploaded On
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Install
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {files.map((file, index) => (
                                    <tr key={index}>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <i class="fas fa-file text-yellow-500 mr-2"></i>
                                                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {file.uploadedBy} {/* Display the name of the user who uploaded the file */}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {file.uploadDate} {/* Display the date of upload */}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <a href={file.url} download={file.name}>
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Download
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


                </div>

            </div>
        </body>
        
    )
    
}