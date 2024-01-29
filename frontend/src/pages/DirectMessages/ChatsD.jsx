import React from 'react'
import profile from '../../imgs/star in the sky.jpg'

const ChatsD = () => {
    return (
        <div className='chats'>
            <div className="userChat mt-2 px-2">
                <img src={profile} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }}>Jane Austen</span>
                    <p>Hello Aditi!</p>
                </div>
            </div>
            <div className="userChat mt-2 px-2">
                <img src={profile} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }}>Jane Austen</span>
                    <p>Hello Aditi!</p>
                </div>
            </div>
            <div className="userChat mt-2 px-2">
                <img src={profile} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }}>Jane Austen</span>
                    <p>Hello Aditi!</p>
                </div>
            </div>
            <div className="userChat mt-2 px-2">
                <img src={profile} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }}>Jane Austen</span>
                    <p>Hello Aditi!</p>
                </div>
            </div>

        </div>
    )
}

export default ChatsD
