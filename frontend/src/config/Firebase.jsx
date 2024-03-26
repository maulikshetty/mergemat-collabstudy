// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {getFirestore, collection, doc , setDoc, updateDoc} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
    apiKey: "AIzaSyBnXGt0U0knvlfAXZPIic48zeuuMc3Irw8",
    authDomain: "test-ad540.firebaseapp.com",
    projectId: "test-ad540",
    storageBucket: "test-ad540.appspot.com",
    messagingSenderId: "1006670365144",
    appId: "1:1006670365144:web:0e5c061e1fec4aade9b2ad",
    measurementId: "G-8D19P5SWTC"
    // apiKey: "AIzaSyA80ArSEJe7L_w_ntcgmNSIvtTYuWIagHw",
    // authDomain: "auth-development-85126.firebaseapp.com",
    // projectId: "auth-development-85126",
    // storageBucket: "auth-development-85126.appspot.com",
    // messagingSenderId: "981071185817",
    // appId: "1:981071185817:web:aa986fb73261c1931db508"
})

// Initialize Firebase

export const auth = app.auth();
//const analytics = getAnalytics(app);
export const db = getFirestore();
export const storage = getStorage(app);
export { collection, doc, setDoc }
export default app;

