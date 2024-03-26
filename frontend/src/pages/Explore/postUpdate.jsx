import React from 'react'
import "./postUpdate.css"
import Modal from "./ModalComponent"
import { useState, useMemo } from 'react';
import { postStatus, getStatus, updatePost } from '../../api/FirestoreAPI';
import PostsCard from "./PostsCard"
import { getCurrentTimeStamp } from '../../helpers/useMoment';
import getUniqueID from '../../helpers/getUniqueID';
import Default from "../../imgs/default.jpg"
import { uploadPostImage } from '../../api/ImageUpload';




export default function postUpdate({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');

    const [allStatus, setAllStatus] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const [currentPost, setCurrentPost] = useState({})

    const [postImage, setPostImage] = useState('')



    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.firstname + ' ' + currentUser.lastname,
            postID: getUniqueID(),
            userId: currentUser.uid,
            postImage: postImage,
        }
        await postStatus(object)
        await setModalOpen(false)
        setIsEdit(false)
        await setStatus("")
    };



    const getEditData = (posts) => {

        setModalOpen(true)
        setStatus(posts?.status)
        setCurrentPost(posts)
        setIsEdit(true)

    }

    const updateStatus = () => {

        updatePost(currentPost.id, status, postImage)
        setModalOpen(false)


    }


    useMemo(() => {
        getStatus(setAllStatus);

    }, [])





    return (
        <div className="postStatusMain">
            <div className='post-status'>
                {currentUser.imageLink ? <img src={currentUser.imageLink} alt='profile pic' /> : <img src={Default} />}
                <p className='name'>{currentUser.firstname} {currentUser.lastname} </p>
                <p className='headline'>{currentUser.headline} </p>

            </div>
            <div className="post">
                {currentUser.imageLink ? <img className='post-image' src={currentUser.imageLink} alt='profile pic' /> : <img src={Default} className='post-image' />}
                <button className="open-post-modal" onClick={() => { setModalOpen(true); setIsEdit(false) }} > Start a Post</button>


            </div>

            <Modal setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} status={status} sendStatus={sendStatus} isEdit={isEdit} updateStatus={updateStatus}
                uploadPostImage={uploadPostImage}
                setPostImage={setPostImage}
                postImage={postImage}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost} />


            <div>
                {allStatus.map((posts) => {
                    return (
                        <div key={posts.id}>
                            <PostsCard posts={posts} getEditData={getEditData} />
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

