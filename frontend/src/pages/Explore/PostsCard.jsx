import React from 'react'
import "./PostsCard.css"
import { useNavigate } from 'react-router-dom'
import LikeButton from './LikeButton'

export default function PostsCard({ posts, id }) {
    let nav = useNavigate()
    return (
        <div className='posts-card' >
            <p className='name' onClick={() =>
                nav("/profile", {
                    state: { id: posts?.userId, email: posts.userEmail },
                })
            } >{posts.userName}</p >
            <p className='timeStamp'>{posts.timeStamp}</p>
            <p className='status'>{posts.status}</p>
            <LikeButton />
        </div>
    )
}



