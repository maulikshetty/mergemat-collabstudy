import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { collection, addDoc, doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, firstName, lastName) {
        return auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Use the UID from the userCredential to create the document in Firestore
            return setDoc(doc(db, 'users', userCredential.user.uid), {
              firstname: firstName,
              lastname: lastName,
              email: email,
              timestamp: serverTimestamp()
            });
          });
      }
      




    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)


    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail

    }

    function updatePassword(password) {
        return currentUser.updatePassword

    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
          if (user) {
            // Set the user's auth details
            setCurrentUser(user);
      
            // Now get the user's additional details from Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            // If the document exists, combine auth and Firestore data
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setCurrentUser(prevUser => {
                return {...prevUser, ...userData};
              });
            }
          }
          setLoading(false);
        });
        return unsubscribe;
      }, []);
      

    const value = {
        currentUser, login, logout, resetPassword, updateEmail, updatePassword, signup
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}

        </AuthContext.Provider>
    )
}