import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../src/config/Firebase'




const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return console.log("");
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
        const unsubscribe =
            auth.onAuthStateChanged(user => {
                setCurrentUser(user)
                setLoading(false)

            })
        return unsubscribe

    }, [])

    const value = {
        currentUser, login, logout, resetPassword, updateEmail, updatePassword, signup
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}

        </AuthContext.Provider>
    )
}
