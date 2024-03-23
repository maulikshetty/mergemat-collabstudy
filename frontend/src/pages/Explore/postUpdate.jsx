import React from 'react'
import "./postUpdate.css"
import Modal from "./ModalComponent"
import { useState, useMemo } from 'react';
import { postStatus, getStatus } from '../../api/FirestoreAPI';
import PostsCard from "./PostsCard"
import { getCurrentTimeStamp } from '../../helpers/useMoment';
import getUniqueID from '../../helpers/getUniqueID';



export default function postUpdate({ currentUser }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');

    const [allStatus, setAllStatus] = useState([])
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.firstname + ' ' + currentUser.lastname,
            postID: getUniqueID(),
            userId: currentUser.uid,
        }
        await postStatus(object)
        await setModalOpen(false)
        await setStatus("")
    };


    useMemo(() => {
        getStatus(setAllStatus);

    }, [])


    return (
        <div className="postStatusMain">
            <div className="post">

                <button className="open-post-modal" onClick={() => setModalOpen(true)}> Start a Post</button>


            </div>

            <Modal setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} status={status} sendStatus={sendStatus} />


            <div>
                {allStatus.map((posts) => {
                    return (
                        <div key={posts.id}>
                            <PostsCard posts={posts} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

