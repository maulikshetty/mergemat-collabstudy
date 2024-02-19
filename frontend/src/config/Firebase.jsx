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
    apiKey: "AIzaSyAFEKWlG3jEbOoxuJPYu4YMpwzt8jnYGxw",
  authDomain: "mergematv3.firebaseapp.com",
  projectId: "mergematv3",
  storageBucket: "mergematv3.appspot.com",
  messagingSenderId: "404854492277",
  appId: "1:404854492277:web:7095d984032848ca2ebc3c",
  measurementId: "G-J33EF6PVS1"
})

// Initialize Firebase

export const auth = app.auth();
//const analytics = getAnalytics(app);
export const db = getFirestore();
export {collection,doc,setDoc}
export const storage = getStorage(app);
export default app;