import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import NotificationBar from '../components/Notificationbar.jsx';
import './styles/content.css';
import { useNavigate } from 'react-router-dom';

export default function Content() {
    const [modalType, setModalType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

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
            
            // Create elements
            const projectDiv = document.createElement('div');
            projectDiv.className = "bg-gray-200 p-4 rounded-lg";
            
            const img = document.createElement('img');
            img.src = "https://placehold.co/300x150";
            img.alt = `Placeholder image of a ${projectName} project`;
            img.className = "rounded-lg mb-2";
            img.style.width = '100%'; // Ensure the image is responsive and fits the container
            img.style.height = 'auto';
            
            const projectNameH4 = document.createElement('h4');
            projectNameH4.className = "font-semibold mb-1";
            projectNameH4.textContent = projectName;
            
            const uploadedByP = document.createElement('p');
            uploadedByP.className = "text-sm mb-2";
            uploadedByP.textContent = "Uploaded by You";
            
            const viewAllButton = document.createElement('button');
            viewAllButton.className = "text-blue-500 text-sm font-semibold";
            viewAllButton.textContent = "VIEW ALL";
            viewAllButton.onclick = () => navigate('/content-in'); // Add the click event
    
            // Append elements
            projectDiv.appendChild(img);
            projectDiv.appendChild(projectNameH4);
            projectDiv.appendChild(uploadedByP);
            projectDiv.appendChild(viewAllButton);
    
            // Append the projectDiv to the container
            projectContainer.appendChild(projectDiv);
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
