import React, { useEffect, useRef } from 'react'
import dp from "../../imgs/star in the sky.jpg"
import { useAuth } from '../../appcontext/Authcontext'
import { useChat } from '../../appcontext/Chatcontext'

const MessageAuth = ({ message }) => {

    const { currentUser } = useAuth()
    const { data } = useChat()
    const ref = useRef()

    // useEffect(() => {
    //     ref.current.scrollIntoView({ behavior: "smooth" }, [message])
    // })


    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect((scrollToBottom),
        [message]
    )



    // console.log(message)

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span> just now</span>

            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && (<img src={message.img} alt="" />)}
            </div>

        </div>
    )
}

export default MessageAuth
