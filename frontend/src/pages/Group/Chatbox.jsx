import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { collection, query, limit, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from "../../config/Firebase"

const Chatbox = () => {
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect((scrollToBottom),
        [messages]
    )



    useEffect(() => {
        const q = query(collection(db, "message"),
            orderBy("createdAt"),
            limit(50))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const message = [];
            querySnapshot.forEach((doc) => {
                message.push({ ...doc.data(), id: doc.id });
            })
            setMessages(message)
        })
        return () => unsubscribe;

    }, [])

    return (
        <div className="pb-44 pt-20 containerWrap" style={{ marginLeft: '20%' }}>
            {messages.map(message => (

                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef}></div>


        </div>
    )
}

export default Chatbox
