import React, { useEffect, useState } from 'react'
import MessageAuth from './MessageAuth'
import './style.css'
import { useChat } from '../../appcontext/Chatcontext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../config/Firebase'

const MessageD = () => {

    const [messages, setMessages] = useState([])
    const { data } = useChat()


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])
    // console.log(messages)



    return (
        <div className='messages'>
            {messages.map((m) => (
                <MessageAuth message={m} key={m.id} />

            ))}
        </div>
    )
}

export default MessageD
