import React from 'react'
import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import {MonacoBinding} from 'y-monaco'



export default function Contenteditor() {

  const editorRef = useRef(null);

  function handleonMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();

    const provider = new WebrtcProvider("testroom", doc);

    const type = doc.getText("monaco");

    const Binding = new MonacoBinding(type, editor.getModel(), new Set([editorRef.current]), provider.awareness);

     console.log(provider.awareness);
  }
  return (

    <>
    <div> tetststs</div>
    <Editor
    height="80vh"
    width="100vw"
    theme= "vs-dark"
    onMount={handleonMount}
    />
    </>
  )
}


/*import app from '../config/firebase'
import * as Y from 'yjs'
import { FireProvider } from "y-fire";
import { useState, useEffect } from 'react';

//This is testing the synchronization of text

export default function Contenteditor() {
  const [collaborativeVar, setCollaborativeVar] = useState('');
  const [collaborativeArr, setCollaborativeArr] = useState([]);
  const [ydoc, setYdoc] = useState(null); // Step 1: Define a state variable for ydoc

  // Combine collaborativeArr and collaborativeVar into a single state object
  const collaborativeObj = { collaborativeVar, collaborativeArr };

  useEffect(() => {
    const doc = new Y.Doc();
    const yText = doc.getText('sharedText'); // Create or get a shared Y.Text
    const yArray = doc.getArray('sharedArray'); // Create or get a shared Y.Array


    const yprovider = new FireProvider({ app, ydoc: doc, path: `test/${1000}` });

    // Define the observer function
    const textObserver = (event) => {
      console.log("Text changed:", yText.toString());
      setCollaborativeVar(yText.toString());
    };

    // Define the observer function for Y.Array
    const arrayObserver = (event) => {
      console.log("Array changed:", yArray.toArray());
      setCollaborativeArr(yArray.toArray());
    };

    // Register the observers
    yText.observe(textObserver);
    yArray.observe(arrayObserver);

    // Step 2: Initialize ydoc in the useEffect hook and update the state variable
    setYdoc(doc);

    // Cleanup function
    return () => {
      yText.unobserve(textObserver); // Unregister the observer using the reference
      yArray.unobserve(arrayObserver);
      doc.destroy();
      yprovider.destroy();
    }
  }, []);

  // Log changes to the collaborative object
  useEffect(() => {
    console.log("Collaborative object changed:", collaborativeObj);
  }, [collaborativeObj]);

  const handleInputChange = (event) => {
    setCollaborativeVar(event.target.value); // Update local state

    // Use the state variable ydoc in the handleInputChange function
    if (ydoc) {
      const yText = ydoc.getText('sharedText');
      yText.delete(0, yText.length); // Remove current text
      yText.insert(0, event.target.value); // Insert new text
    }
  };

  const handleAddItem = (item) => {
    if (ydoc) {
      const yArray = ydoc.getArray('sharedArray');
      yArray.insert(yArray.length, [item]); // Insert the item at the end of the array
    }
  };

  return (
    <div>
      <input
        type="text"
        value={collaborativeVar}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <br/>
      <button
        onClick={() => handleAddItem(collaborativeVar)}
        style={{
          border: '2px solid black',
          padding: '10px',
          margin: '10px 0',
          cursor: 'pointer'
        }}
      >
        Add to Array
      </button>
      <br/>
      <ol>
        {collaborativeArr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
}
*/