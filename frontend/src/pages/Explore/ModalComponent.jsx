import React, { useState } from 'react';
import "./Modal.css"
import { Modal, Button, Progress } from 'antd';
import { SlPicture } from "react-icons/sl";


const ModalComponent = ({ modalOpen, setModalOpen, setStatus, status, sendStatus, isEdit, updateStatus, uploadPostImage, setPostImage, postImage, currentPost, setCurrentPost }) => {

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    const [progress, setProgress] = useState(0)



    return (
        <>
            <Modal
                title="Create a post"
                centered
                open={modalOpen}
                onOk={() => {
                    setStatus('')
                    setModalOpen(false)
                    setPostImage('')
                    setCurrentPost({})

                }}

                onCancel={() => {
                    setStatus('')
                    setModalOpen(false)
                    setPostImage('')
                    setCurrentPost({})

                }}


                footer={[
                    <Button
                        onClick={isEdit ? updateStatus : sendStatus}
                        disabled={status.length > 0 ? false : true}

                    >

                        {isEdit ? 'Update' : 'Post'} </Button >
                ]}
            >
                <div>
                    <textarea className="modal-input" placeholder='what do you want to talk about?' onChange={(event) => setStatus(event.target.value)} value={status} />

                    {progress === 0 || progress === 100 ? <></> : <Progress percent={progress} strokeColor={twoColors} />}


                    {postImage?.length > 0 || (currentPost?.postImage?.length) ? <img className='preview-img' src={postImage || currentPost.postImage} alt='post-image' /> : <></>}

                </div>

                <label for='pic-upload'><SlPicture className='pic-icon' size={32} color='#0693e3' /></label>
                <input id="pic-upload" type={'file'} hidden onChange={(event) => uploadPostImage(event.target.files[0], setPostImage, setProgress)} />



            </Modal >
        </>
    );
};
export default ModalComponent;