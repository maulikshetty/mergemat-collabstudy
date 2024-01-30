import React from 'react'
import InputD from './InputD'
import MessageD from './MessageD'
import { useChat } from '../../appcontext/Chatcontext'

const ChatD = () => {

    const { data } = useChat()

    return (

        <div className="chat">

            <div className="chatInfo">
                <div className="together">
                    <img
                        alt=""
                        className="image"
                        src={data.user?.photoURL}
                    />
                    <span>{data.user?.firstname} {data.user?.lastname}</span>
                </div>
                <div className="flex justify-end pr-4">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0 a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>
                </div>

            </div>

            <MessageD />
            <InputD />


        </div>

    )
}

export default ChatD
