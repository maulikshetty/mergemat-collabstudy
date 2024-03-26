import React, { useRef, useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import * as Y from 'yjs';
import { FireProvider } from 'y-fire';
import { MonacoBinding } from 'y-monaco';
import app from '../config/Firebase'; // Import your Firebase app
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { useToast } from "@chakra-ui/react";
import { db, auth } from '../config/Firebase.jsx';
import * as monacoMarkdown from 'monaco-markdown';

export default function Contenteditor() {

  const { groupId } = useParams(); // Get groupId from URL
    const [group, setGroup] = useState(null);
    const [hasShownToast, setHasShownToast] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
  const editorRef = useRef(null);
 

  function handleonMount(editor, monaco) {
    editorRef.current = editor;
    const ydoc = new Y.Doc();

    const provider = new FireProvider({ app, ydoc, path: `groups/${groupId}` });

    const yText = ydoc.getText('monaco');
    new MonacoBinding(yText, editor.getModel(), new Set([editorRef.current]), provider.awareness);
    
    console.log(provider.awareness);
  }


  useEffect(() => {

    console.log('Group component rendered'); // Add this line



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
            }
        } catch (error) {
            console.error('Error fetching group:', error);
        }
    };
    fetchGroup();
    
}, [groupId]);



return (
  <div className="h-screen flex flex-col">
    <script src="https://cdn.tailwindcss.com"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    ></link>
    <div className="flex flex-col md:flex-row h-full bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex space-x-4">
            <button className="text-gray-500 md:hidden" >
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex items-center space-x-3">
                            <i className="fas fa-users text-gray-800 text-lg"></i>
                            <span className="font-semibold text-lg">{group && group.groupName}</span>
                        </div>
            <div className="text-gray-500 "  onClick={() => navigate(`/group/${groupId}`)}>General</div>
            <div className="text-gray-500 font-bold">Live Collaboration</div>
            <div className="text-gray-500 "  onClick={() => navigate(`/group/${groupId}/files`)}>File</div>
            <div
              className="text-gray-500"
              onClick={() => navigate(`/group/${groupId}/members`)}
            >
              Members
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="border rounded px-2 py-1"
                placeholder="Search"
              />
              <i className="fas fa-search absolute right-2 top-2 text-gray-400"></i>
            </div>
            <i
              className="fas fa-video custom-icon"
              onClick={() => window.open('/zego')}
            ></i>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="border border-blue-500">
            <Editor height="100vh" width="100vw" theme="vs-light" onMount={handleonMount} language='markdown'/>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}