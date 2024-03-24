import React, { useMemo, useState } from 'react'
import "./PostsCard.css"
import { useNavigate } from 'react-router-dom'
import LikeButton from './LikeButton'
import { getCurrentUser, getAllUsers } from '../../api/FirestoreAPI'

export default function PostsCard({ posts, id }) {
    let nav = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])



    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers)
    }, [])


    return (
        <div className='posts-card' >
            <div>
                <img alt='profile-image'
                    className='post-image' src={allUsers.filter((item) => item.id === posts.userId).map((item) => item.imageLink)[0]} />
                <p className='name' onClick={() =>
                    nav("/profile", {
                        state: { id: posts?.userId, email: posts.userEmail },
                    })
                } >{posts.userName}</p >
            </div>


            <p className='timeStamp'>{posts.timeStamp}</p>
            <p className='status'>{posts.status}</p>
            <LikeButton userId={currentUser?.uid} postId={posts.postID} currentUser={currentUser} />
        </div>
    )
}



