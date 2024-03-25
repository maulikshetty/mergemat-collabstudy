import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../config/Firebase'
import { collection, addDoc, doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password, firstName, lastName, username) {
        return auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {

            userCredential.user.sendEmailVerification()
            // Use the UID from the userCredential to create the document in Firestore
            return setDoc(doc(db, 'users', userCredential.user.uid), {
              firstname: firstName,
              lastname: lastName,
              email: email,
              username: username,
              timestamp: serverTimestamp()
            });
          });
      }
      

      function resendVerificationEmail() {
        return auth.currentUser.sendEmailVerification()
          .then(() => {
            // Email verification sent
            alert('Email verification link has been resent to your email address.');
          })
          .catch((error) => {
            // Handle error
            alert('Error resending email verification: ' + error.message);
          });
      }



    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Check if the user's email is verified
          if (userCredential.user.emailVerified) {
            // Email is verified, allow login
            return userCredential;
          } else {
            // Email is not verified, throw an error
            alert('Please verify your email before logging in.');
            resendVerificationEmail(email);
            throw new Error('Please verify your email before logging in.');
          }
        });

    }

 

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
       
        //const docref= doc(db, 'users', auth.userCredential.user.uid)
        
      
        return auth.currentUser.verifyBeforeUpdateEmail(email)
        
        

          // Use the UID from the userCredential to create the document in Firestore
         
        

    }

   

    function updatePassword(password) {
        return currentUser.updatePassword

    }
    



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
          if (user) {

            if (user.emailVerified) {
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
          }else {
            // Email is not verified, clear the currentUser state
            setCurrentUser(null);
          } 
          }
          setLoading(false);
        });
        return unsubscribe;
      }, []);
      

    const value = {
        currentUser, login, logout, resetPassword, updateEmail, updatePassword, signup, resendVerificationEmail
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}

        </AuthContext.Provider>
    )
}
