import React from 'react'
import "./styles/tldrawst.css"
import { Tldraw } from 'tldraw'
import { createTLStore, defaultShapeUtils } from 'tldraw'
import { useState, useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { FireProvider } from 'y-fire'
import app, { db } from '../config/Firebase'
import { getDocs, query, collection, where, addDoc, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useToast } from "@chakra-ui/react";

function Contentwhite() {


const toast = useToast();
const navigate = useNavigate();
const [group, setGroup] = useState(null);

const { groupId } = useParams();


const handleshare =() => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log('URL copied to clipboard:', currentUrl);
      toast({
        title: "Copied to clipboard",
        description: "The URL has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      console.error('Error copying URL to clipboard:', error);
    });
}

const tldrawRef = useRef(null);
tldrawRef.current = new Tldraw({ position: 'fixed', inset: 0});

const [store] = useState(() => {

  const newStore = createTLStore({
    shapeUtils: defaultShapeUtils,
  })

const stringified = localStorage.getItem('my-editor-snapshot')
const snapshot = JSON.parse(stringified)
})

const [parsedData, setParsedData] = useState([]);
const [ydoc, setYdoc] = useState(null); // Step 1: Define a state variable for ydoc

useEffect(() => {

  const fetchGroup = async () => {
  
    try {
      const groupQuery = query(collection(db, 'projects'), where('id', '==', groupId));
      const groupSnapshot = await getDocs(groupQuery); // Execute the query
            
                    if (!groupSnapshot.empty) {
                        const groupDoc = groupSnapshot.docs[0]; // Get the first (and should be the only) document that matches the query
                        const groupData = groupDoc.data(); // Get the group data
                        setGroup(groupData); // Set the group data
                        console.log('Group ID:', groupId);
                        console.log('Group Name:', groupData.groupName);
          } 
          else {
            console.log('No such group!');
            toast({
              title: "Access Denied",
              description: "You don't have access to this group.",
              status: "error",
              duration: 5000,
              isClosable: true,
          });
            navigate('/content');
        }     
    } 
    catch (error) {
      console.error('Error fetching project:', error);
    }
  };
  fetchGroup();

const doc = new Y.Doc();

const yMap = doc.getMap('tldraw'); // Create or get a shared Y.Map

const yprovider = new FireProvider({ app, ydoc: doc, path: `tldrawroom/${1000}` });

// Define the observer function for Y.Map
const mapObserver = (event) => {
    console.log("Map changed:", yMap.toJSON());
    setParsedData(yMap.toJSON());
};

// Register the observer
yMap.observe(mapObserver);

// Step 2: Initialize ydoc in the useEffect hook and update the state variable
setYdoc(doc);

// Cleanup function
return () => {
    yMap.unobserve(mapObserver); // Unregister the observer using the reference
    doc.destroy();
    yprovider.destroy();
}

}, []);

// Log changes to the parsedData
useEffect(() => {
console.log("Parsed data changed:", parsedData);
}, [parsedData]);



  return (
    <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <body className="h-full bg-gray-100">
      <div className="flex flex-col lg:flex-row h-screen">
        <Sidebar />
        {/* Topbar */}
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <a href="/content" className="text-gray-600 text-sm mr-4">
                <i className="fas fa-arrow-left"></i>
              </a>
              <div>
                <h1 className="text-2xl font-semibold">{group && group.name}</h1>
                <p className="text-gray-500 text-sm">Whiteboard</p>
              </div>
            </div>
            <div className="flex items-center">
              
              <button className="ml-4 bg-blue-600 text-white rounded-full py-2 px-4 text-sm" onClick={handleshare}>
                Share
              </button>
            </div>
          </div>
          
          <Tldraw store={store} DebugMenu={null} persistenceKey="my-persistence-key"/>
      
        </div>
      </div>
    </body>
  </div>
    
    
  )
}

export default Contentwhite;