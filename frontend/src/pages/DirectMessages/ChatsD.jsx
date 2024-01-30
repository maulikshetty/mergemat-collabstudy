import React, { useEffect, useState, useCallback } from 'react'
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../config/Firebase"
import { useAuth } from '../../appcontext/Authcontext'
import { useChat } from '../../appcontext/Chatcontext'
import Default from "../../imgs/default.jpg"


const ChatsD = () => {
    const [chats, setChats] = useState([])
    const { currentUser } = useAuth()
    const { dispatch } = useChat()

    useEffect(() => {

        const getChats = () => {
            //listen to real time data
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())

            })

            //clean up after receiving current time data

            return () => {
                unsub();
            }
        }

        currentUser.uid && getChats()


    }, [currentUser.uid])





    //to change the user in chatbox upon clicking
    const handleSelect = (u) => {
        console.log("selected user:", u)
        dispatch({ type: "CHANGE_USER", payload: u });
    }


    return (

        <div className="chats">
            {
                Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (

                    < div className="userChat" key={chat[0]} onClick={() => { console.log("User clicked!"); handleSelect(chat[1].userInfo) }}>

                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatInfo">
                            <span style={{ fontWeight: 'bold', color: 'black' }}>{chat[1].userInfo.firstname} {chat[1].userInfo.lastname} </span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>

                    </div>

                ))
            }



        </div >




    )
}

export default ChatsD