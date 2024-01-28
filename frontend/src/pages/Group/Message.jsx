import React from 'react'
import { useAuth } from '../../appcontext/Authcontext'

const Message = ({ message }) => {

    const { currentUser } = useAuth()


    return (
        <div>

            <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full " >
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header" style={{ color: 'black' }}>
                    {message.firstname} {message.lastname}
                </div>
                <div className="chat-bubble">{message.text}</div>

            </div>



        </div>
    )
}

export default Message

