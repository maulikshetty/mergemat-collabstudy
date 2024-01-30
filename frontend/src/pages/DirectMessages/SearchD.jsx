import React, { useState } from 'react'
import './style.css'
import { doc, setDoc, updateDoc, collection, query, where, getDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "../../config/Firebase"
import { useAuth } from "../../appcontext/Authcontext"
import { useChat } from '../../appcontext/Chatcontext'

const SearchD = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState("")
    const { currentUser } = useAuth()
    const { dispatch } = useChat()


    const handleSearch = async () => {

        const q = query(collection(db, "users"), where("firstname", "==", username))

        try {


            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                console.log(doc.id, "=>", doc.data())
            })

        } catch (error) {
            console.log(error)
            setErr(true)

        }
    }


    const handleKey = e => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {

        //check if the group exists(chats collection in firestore), if not create a new one

        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combinedId))

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        firstname: currentUser.firstname,
                        lastname: currentUser.lastname,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (e) {

            console.log("chats are not saved in firebase", e)

        }

        setUser(null)
        setUsername("")

    }




    return (
        <div className='search mt-4'>
            <div className='searchForm'>
                <input type="text" placeholder="Find a user" className="input input-bordered w-full max-w-xs" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
            {err && <span>User not found</span>}
            {user && (<div className="userChat mt-10" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }} >{user.firstname} {user.lastname}</span>
                </div>
            </div>
            )}




        </div >
    )
}

export default SearchD
