import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import NotificationBar from '../components/Notificationbar.jsx';
import './styles/content.css';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../config/Firebase.jsx';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import imgs from '../imgs/Group1mergematplacehold.png'
import imgs2 from '../imgs/Coverdocuemnt.png'

// test


export default function Content() {
    const [modalType, setModalType] = useState('');
    const { currentUser } = useAuth();
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    const [projectDataref, setProjectDataref] = useState(null);
   

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, 'projects'), where('type', '==', 'whiteboard'), where('uploadedBy', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const projectsData = [];
                querySnapshot.forEach((doc) => {
                    projectsData.push({ id: doc.id, ...doc.data() });
                });
                setProjects(projectsData);
            } catch (error) {
                console.error('Error fetching projects: ', error);
            }
        };

        const fetchDocuments = async () => {
            try {
                const q = query(collection(db, 'projects'), where('type', '==', 'document'), where('uploadedBy', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const documentsData = [];
                querySnapshot.forEach((doc) => {
                    documentsData.push({ id: doc.id, ...doc.data() });
                });
                setDocuments(documentsData);
            } catch (error) {
                console.error('Error fetching documents: ', error);
            }
        };

        fetchProjects();
        fetchDocuments();
    }, []);

    const openModal = (type) => {
        setModalType(type);
        setProjectName('');
    };

    const closeModal = () => {
        setModalType('');
    };

    const generateProjectId = () => {
        // Generate a random project id
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10;
        let projectId = '';
        for (let i = 0; i < length; i++) {
            projectId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return projectId;
    };

    const addProject = async () => {
        if (projectName.trim() !== '') {
            try {
                // Generate a project id
                const projectId = generateProjectId();
                const docID = projectId;
                setProjectDataref(docID);
                // Store project details in Firestore
                const newProjectData = {
                    id: projectId,
                    name: projectName,
                    type: modalType,
                    uploadedBy: auth.currentUser.uid,
                };
                //const docRef = await addDoc(collection(db, 'projects'), newProjectData);
                const docRef = doc(db, 'projects', docID);
                await setDoc(docRef, newProjectData);
                // Get the container where the new project will be displayed
                const projectContainerId = modalType === 'whiteboard' ? 'whiteboardProjects' : 'documentProjects';
                const projectContainer = document.getElementById(projectContainerId);
    
                // Create elements for the new project
                const projectDiv = document.createElement('div');
                projectDiv.className = 'bg-gray-200 p-4 rounded-lg';
    
                const img = document.createElement('img');
                img.src = 'https://mm.codespectre.org/src/imgs/Group1mergematplacehold.png';
                img.alt = `Placeholder image of a ${projectName} project`;
                img.className = 'rounded-lg mb-2';
                img.style.width = '100%';
                img.style.height = 'auto';
    
                const projectNameH4 = document.createElement('h4');
                projectNameH4.className = 'font-semibold mb-1';
                projectNameH4.textContent = projectName;
    
                const uploadedByP = document.createElement('p');
                uploadedByP.className = 'text-sm mb-2';
                uploadedByP.textContent = 'Uploaded by You';
    
                const viewAllButton = document.createElement('button');
                viewAllButton.className = 'text-blue-500 text-sm font-semibold mr-1'; // Added margin-right
                viewAllButton.textContent = 'VIEW ALL ';
                viewAllButton.onclick = () => window.location.href = `/content/doc/${projectId}`;
    
                const deleteButton = document.createElement('button');
                deleteButton.className = 'text-red-500 text-sm font-semibold ml-1'; // Added margin-left
                deleteButton.textContent = 'DELETE';
                deleteButton.onclick = () => deleteProject(projectName, modalType);
    
                // Append elements to the div
                projectDiv.appendChild(img);
                projectDiv.appendChild(projectNameH4);
                projectDiv.appendChild(uploadedByP);
                projectDiv.appendChild(viewAllButton);
                projectDiv.appendChild(deleteButton);
    
                // Append the projectDiv to the container
                projectContainer.appendChild(projectDiv);
    
                // Show success toast
                toast({
                    title: 'Project Created',
                    description: `${projectName} has been created successfully.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
    
                console.log('Project added with ID: ', docRef.id);
    
                // Refresh the page
                window.location.reload();

            } catch (error) {
                // Show error toast if there's a problem adding the project
                console.error('Error adding project: ', error);
                toast({
                    title: 'Error',
                    description: 'Failed to create project.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
    
            // Close the modal
            closeModal();
        }
    };
    
   
    const deleteProject = async (projectName, type) => {
        try {
            const collectionName = 'projects';
            const project = type === 'whiteboard' ? projects.find((p) => p.name === projectName) : documents.find((p) => p.name === projectName);
            //const groupQuery = query(collection(db, 'projects'), where('id', '==', project.id));
            //setProjectDataref(doc(db, 'projects', project.id));
            if (project) {
                console.log('project: ', projectDataref);
                console.log('db: ', db);
                console.log('project.id: ', project.id);
                //console.log('groupQuery: ', groupQuery);
                //await deleteDoc(doc(db, groupQuery));
                await deleteDoc(doc(db, 'projects', project.id));
                console.log(`${type} project deleted: `, projectName);

                // Remove the deleted project from the array
                if (type === 'whiteboard') {
                    setProjects(projects.filter((p) => p.name !== projectName));
                } else {
                    setDocuments(documents.filter((p) => p.name !== projectName));
                }

                toast({
                    title: 'Project Deleted',
                    description: `${projectName} has been deleted.`,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });

            } else {
                console.log(`${type} project not found: `, projectName);
            }
        } catch (error) {
            console.error(`Error deleting ${type} project: `, error);
            toast({
                title: 'Error',
                description: `Failed to delete ${projectName}.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row
         bg-gray-100">
            <Sidebar />

            <div className="flex-grow px-6 py-8">
                {/* Main content grows to fill the space */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">Your Content</h2>
                    <div className="mb-6">
                        <ul className="flex space-x-4 mb-4">
                            <li className="text-blue-500 font-semibold">Recently viewed</li>
                        </ul>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">Whiteboard projects</h3>
                            <button
                                className="text-blue-500 text-sm font-semibold"
                                onClick={() => openModal('whiteboard')}
                            >
                                + New Whiteboard
                            </button>
                        </div>
                        <div
                            id="whiteboardProjects"
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {projects.length === 0 ? (
                                <p>No whiteboard projects created.</p>
                            ) : (
                            
                            projects.map((project) => (
                                <div key={project.name} className="bg-gray-100 p-4 rounded-lg">
                                    <img
                                        src={imgs}
                                        alt={`Placeholder image of a ${project.name} project`}
                                        className="rounded-lg mb-2"
                                        style={{ width: '420px', height: '250px' }}
                                    />
                                    <h4 className="font-semibold mb-1">{project.name}</h4>
                                    <p className="text-sm mb-2">Uploaded by You</p>
                                    <button
                                        className="text-blue-500 text-sm font-semibold mr-2"
                                        onClick={() => window.location.href = `/content/whiteboard/${project.id}`}
                                    >
                                        VIEW ALL 
                                    </button>
                                    <button
                                        className="text-red-500 text-sm font-semibold"
                                        onClick={() => deleteProject(project.name, 'whiteboard')}
                                    >
                                         DELETE
                                    </button>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">Documents</h3>
                            <button
                                className="text-blue-500 text-sm font-semibold"
                                onClick={() => openModal('document')}
                            >
                                + New Document
                            </button>
                        </div>
                        <div
                            id="documentProjects"
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                                                        {documents.length === 0 ? (
                                <p>No documents created.</p>
                            ) : (
                            documents.map((document) => (
                                <div key={document.name} className="bg-gray-100 p-4 rounded-lg">
                                    <img
                                        src={imgs2}
                                        alt={`Placeholder image of a ${document.name} document`}
                                        className="rounded-lg mb-2"
                                        style={{ width: '420px', height: '250px' }}
                                    />
                                    <h4 className="font-semibold mb-1">{document.name}</h4>
                                    <p className="text-sm mb-2">Uploaded by You</p>
                                    <button
                                        className="text-blue-500 text-sm font-semibold mr-2"
                                        onClick={() => window.location.href = `/content/doc/${document.id}`}
                                    >
                                        VIEW ALL 
                                    </button>
                                    <button
                                        className="text-red-500 text-sm font-semibold"
                                        onClick={() => deleteProject(document.name, 'document')}
                                    >
                                         DELETE
                                    </button>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-64">
                {/* Adjust width as needed */}
                <NotificationBar />
            </div>

            {/* Modal */}
            <div
                id="modal"
                className={`fixed inset-0 bg-black bg-opacity-50 ${
                    modalType ? '' : 'hidden'
                } flex justify-center items-center`}
                style={{ zIndex: 1000 }}
            >
                <div className="bg-white p-6 rounded-lg w-full max-w-xs mx-auto relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-0 right-0 mt-2 mr-2 text-black text-lg font-semibold"
                    >
                        &times;
                    </button>
                    <h3 className="font-semibold text-lg mb-4 text-center">
                        {modalType === 'whiteboard'
                            ? 'Enter Whiteboard Project Name'
                            : 'Enter Document Name'}
                    </h3>
                    <input
                        type="text"
                        className="border p-2 rounded w-full mb-4"
                        placeholder="Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <div className="text-center">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={addProject}
                        >
                            Add Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}