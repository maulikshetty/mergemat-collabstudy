import React, { useEffect, useMemo, useState } from 'react'
import "./PostsCard.css"
import { useNavigate } from 'react-router-dom'
import LikeButton from './LikeButton'
import { getCurrentUser, getAllUsers, deletePost, getConnections } from '../../api/FirestoreAPI'
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import Default from "../../imgs/default.jpg"

export default function PostsCard({ posts, id, getEditData }) {
    let nav = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [isConnected, setIsConnected] = useState(false)




    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers)
    }, [])
    // const newUser = () => { allUsers.filter((user) => user.uid === posts.userId)[0]; }

    useEffect(() => {
        getConnections(currentUser.uid, posts.userId, setIsConnected)
    }, [currentUser.uid, posts.userId])



    return isConnected || currentUser.uid === posts.userId ? (

        <div className='posts-card' key={id}>
            < div className='post-image-wrapper' >

                {
                    currentUser.uid === posts.userId ? (<div className='action-container'>
                        <GoPencil size={20} className='action-icon-edit' onClick={() => { getEditData(posts) }} />
                        <RiDeleteBin5Line size={20} className='action-icon-delete' onClick={() => {
                            deletePost(posts.id)

                        }} />
                    </div>) : (<></>)
                }
                {allUsers.filter((item) => item.id === posts.userId).map((item) => item.imageLink)[0] ? < img alt='profile-image'
                    className='post-image' src={allUsers.filter((item) => item.id === posts.userId).map((item) => item.imageLink)[0]} /> : <img className='default-img' src={Default} />}
                <div>
                    <p className='name' onClick={() =>
                        nav("/profile", {
                            state: { id: posts?.userId, email: posts.userEmail },
                        })
                    }> {allUsers.filter((user) => user.uid === posts.userId)[0]?.firstname} {allUsers.filter((user) => user.uid === posts.userId)[0]?.lastname}</p >
                    <p className='headline'>{allUsers.filter((user) => user.uid === posts.userId)[0]?.headline} </p>
                    <p className='timeStamp'>{posts.timeStamp}</p>
                </div>
            </div >


            <p className='status'>{posts.status}</p>
            <LikeButton userId={currentUser?.uid} postId={posts.postID} currentUser={currentUser} />
        </div >
    ) : (<></>)
}



