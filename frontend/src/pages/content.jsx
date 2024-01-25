import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import NotificationBar from '../components/Notificationbar.jsx';
import './styles/content.css';

export default function Content() {
    const [modalType, setModalType] = useState('');
    const [projectName, setProjectName] = useState('');

    const openModal = (type) => {
        setModalType(type);
        setProjectName('');
    };

    const closeModal = () => {
        setModalType('');
    };

    const addProject = () => {
        if (projectName.trim() !== '') {
            const projectContainerId = modalType === 'whiteboard' ? 'whiteboardProjects' : 'documentProjects';
            const projectContainer = document.getElementById(projectContainerId);
            
            const projectElement = `
                <div class="bg-gray-200 p-4 w-64 rounded-lg">
                    <img src="https://placehold.co/300x150" alt="Placeholder image of a ${projectName} project" class="rounded-lg mb-2">
                    <h4 class="font-semibold mb-1">${projectName}</h4>
                    <p class="text-sm mb-2">Uploaded by You</p>
                    <button class="text-blue-500 text-sm font-semibold">VIEW ALL</button>
                </div>
            `;
            projectContainer.innerHTML += projectElement;
        }

        closeModal();
    };


    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

      
          <div className="flex-grow px-6 py-8"> {/* Main content grows to fill the space */}
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
                        <button className="text-blue-500 text-sm font-semibold" onClick={() => openModal('whiteboard')}>+ New Whiteboard</button>
                    </div>
                    <div id="whiteboardProjects" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Whiteboard projects will be added here */}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">Documents</h3>
                        <button className="text-blue-500 text-sm font-semibold" onClick={() => openModal('document')}>+ New Document</button>
                    </div>
                    <div id="documentProjects" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Document projects will be added here */}
                    </div>
                </div>
            </div>
          </div>
      
          <div className="w-64"> {/* Adjust width as needed */}
            <NotificationBar />
          </div>
      
          {/* Modal */}
          <div id="modal" className={`fixed inset-0 bg-black bg-opacity-50 ${modalType ? '' : 'hidden'} flex justify-center items-center`} style={{ zIndex: 1000 }}>
          <div className="bg-white p-6 rounded-lg w-full max-w-xs mx-auto relative">
                    <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2 text-black text-lg font-semibold">
                        &times;
                    </button>
                    <h3 className="font-semibold text-lg mb-4 text-center">{modalType === 'whiteboard' ? 'Enter Whiteboard Project Name' : 'Enter Document Name'}</h3>
                    <input 
                        type="text" 
                        className="border p-2 rounded w-full mb-4" 
                        placeholder="Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <div className="text-center">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addProject}>Add Project</button>
                    </div>
                </div>
          </div>
        </div>
      );
      
    
        
}
