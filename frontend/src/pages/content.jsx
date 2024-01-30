import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import NotificationBar from '../components/Notificationbar.jsx';
import './styles/content.css';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../config/firebase.jsx';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../appcontext/Authcontext';


export default function Content() {
    const [modalType, setModalType] = useState('');
    const { currentUser } = useAuth();
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

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

    const addProject = async () => {
        if (projectName.trim() !== '') {
            const projectContainerId =
                modalType === 'whiteboard'
                    ? 'whiteboardProjects'
                    : 'documentProjects';
            const projectContainer = document.getElementById(projectContainerId);

            // Create elements
            const projectDiv = document.createElement('div');
            projectDiv.className = 'bg-gray-200 p-4 rounded-lg';

            const img = document.createElement('img');
            img.src = 'https://placehold.co/300x150';
            img.alt = `Placeholder image of a ${projectName} project`;
            img.className = 'rounded-lg mb-2';
            img.style.width = '100%'; // Ensure the image is responsive and fits the container
            img.style.height = 'auto';

            const projectNameH4 = document.createElement('h4');
            projectNameH4.className = 'font-semibold mb-1';
            projectNameH4.textContent = projectName;

            const uploadedByP = document.createElement('p');
            uploadedByP.className = 'text-sm mb-2';
            uploadedByP.textContent = 'Uploaded by You';

            const viewAllButton = document.createElement('button');
            viewAllButton.className = 'text-blue-500 text-sm font-semibold';
            viewAllButton.textContent = 'VIEW ALL';
            viewAllButton.onclick = () => navigate('/content-in'); // Add the click event

            const deleteButton = document.createElement('button');
            deleteButton.className = 'text-red-500 text-sm font-semibold';
            deleteButton.textContent = 'DELETE';
            deleteButton.onclick = () => deleteProject(projectName, modalType); // Add the click event

            // Append elements
            projectDiv.appendChild(img);
            projectDiv.appendChild(projectNameH4);
            projectDiv.appendChild(uploadedByP);
            projectDiv.appendChild(viewAllButton);
            projectDiv.appendChild(deleteButton);

            // Append the projectDiv to the container
            projectContainer.appendChild(projectDiv);

            // Store project details in Firestore
            try {
                const docRef = await addDoc(collection(db, 'projects'), {
                    name: projectName,
                    type: modalType,
                    uploadedBy: auth.currentUser.uid,
                });
                console.log('Project added with ID: ', docRef.id);
            } catch (error) {
                console.error('Error adding project: ', error);
            }
        }

        closeModal();
    };

    const deleteProject = async (projectName, type) => {
        try {
            const collectionName = 'projects';
            const project = type === 'whiteboard' ? projects.find((p) => p.name === projectName) : documents.find((p) => p.name === projectName);
            if (project) {
                await deleteDoc(doc(db, collectionName, project.id));
                console.log(`${type} project deleted: `, projectName);

                // Remove the deleted project from the array
                if (type === 'whiteboard') {
                    setProjects(projects.filter((p) => p.name !== projectName));
                } else {
                    setDocuments(documents.filter((p) => p.name !== projectName));
                }
            } else {
                console.log(`${type} project not found: `, projectName);
            }
        } catch (error) {
            console.error(`Error deleting ${type} project: `, error);
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-grow px-6 py-8">
                {/* Main content grows to fill the space */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">Your Content</h2>
                    <div className="mb-6">
                        <ul className="flex space-x-4 mb-4">
                            <li className="text-blue-500 font-semibold">Recently viewed</li>
                            <li>Shared files</li>
                            <li>Shared projects</li>
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
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {projects.map((project) => (
                                <div key={project.name} className="bg-gray-200 p-4 rounded-lg">
                                    <img
                                        src="https://placehold.co/300x150"
                                        alt={`Placeholder image of a ${project.name} project`}
                                        className="rounded-lg mb-2"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <h4 className="font-semibold mb-1">{project.name}</h4>
                                    <p className="text-sm mb-2">Uploaded by You</p>
                                    <button
                                        className="text-blue-500 text-sm font-semibold mr-2"
                                        onClick={() => navigate('/content-in')}
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
                            ))}
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
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {documents.map((document) => (
                                <div key={document.name} className="bg-gray-200 p-4 rounded-lg">
                                    <img
                                        src="https://placehold.co/300x150"
                                        alt={`Placeholder image of a ${document.name} document`}
                                        className="rounded-lg mb-2"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <h4 className="font-semibold mb-1">{document.name}</h4>
                                    <p className="text-sm mb-2">Uploaded by You</p>
                                    <button
                                        className="text-blue-500 text-sm font-semibold"
                                        onClick={() => navigate('/content-in')}
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
                            ))}
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
