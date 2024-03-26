// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import {getFirestore, collection, doc , setDoc, updateDoc} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp( {
  apiKey: "AIzaSyDa3x9YP5vNwMkRwp7Sislm3PXMks3bXuw",
  authDomain: "merge-6c879.firebaseapp.com",
  projectId: "merge-6c879",
  storageBucket: "merge-6c879.appspot.com",
  messagingSenderId: "577094059196",
  appId: "1:577094059196:web:37c2d6c8d31688b9ebfcb9",
  measurementId: "G-G192QXZDWQ"
})

// Initialize Firebase

export const auth = app.auth();
//const analytics = getAnalytics(app);
export const db = getFirestore();
export {collection,doc,setDoc}
export const storage = getStorage(app);
export default app;
