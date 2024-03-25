import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import app  from '../config/Firebase';
import { db, auth } from '../config/Firebase';
import * as Y from 'yjs';
import { FireProvider } from 'y-fire';
import { QuillBinding } from 'y-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import { getDocs, query, collection, where, addDoc, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const Container = styled.div`
  background-color: #F3F3F3;

  .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }

  .ql-toolbar.ql-snow {
    display: flex;
    justify-content: center;
    top: 0;
    z-index: 1;
    background-color: #F3F3F3;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
  }
  .ql-editor {
    width: 8.5in;
    min-height: 11in;
    padding: 1in;
    margin: 1rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
    background-color: white;
  }

  @media print {
    .ql-editor {
      width: 6.5in;
      height: 9in;
      padding: 0;
      margin: 0;
      box-shadow: none;
    }
  }
`;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

  const modules = {
    toolbar:  TOOLBAR_OPTIONS
  
  };

function ContentRichText() {
  const toast = useToast();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  const { groupId } = useParams();

  const quillRef = useRef(null); // Create a ref to store the Quill instance

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
 
    if (quillRef.current != null) {
      const ydoc = new Y.Doc();
      const yText = ydoc.getText('quill');
      const provider = new FireProvider({ app, ydoc, path: `projects/${groupId}` });
      const binding = new QuillBinding(yText, quillRef.current.getEditor(), provider.awareness);

      // Cleanup function
      return () => {
        binding.destroy();
        provider.destroy();
        ydoc.destroy();
      };
    }
  }, [groupId]);

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
                  <p className="text-gray-500 text-sm">Live Document</p>
                </div>
              </div>
              <div className="flex items-center">
                
                <button className="ml-4 bg-blue-600 text-white rounded-full py-2 px-4 text-sm" onClick={handleshare} >
                  Share
                </button>
              </div>
            </div>
            <Container>
            <ReactQuill theme="snow" ref={quillRef} modules={modules}/>
            </Container>
          </div>
        </div>
      </body>
    </div>
  );
  }
export default ContentRichText;