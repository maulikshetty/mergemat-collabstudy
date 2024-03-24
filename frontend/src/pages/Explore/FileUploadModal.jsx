import React, { useState } from 'react'
import "./FileUploadModal.css"
import { Button, Modal } from 'antd';
import { Flex, Progress } from 'antd';

const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};



export default function FileUploadModal({ modalOpen, setModalOpen, getImage, uploadPicture, currentImage, progress }) {
    return (
        <div>
            <Modal
                title="Profile Image"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={[

                    <Button disabled={currentImage.name ? false : true} className="profile-image-btn" key="submit" type="primary" onClick={uploadPicture}>Upload
                    </Button>,


                ]}
            >
                <div>
                    <div className='image-upload-main'>
                        <p>{currentImage.name}</p>
                        <label className="upload-btn" for="image-upload">Add an Image</label>
                        <input hidden id="image-upload" type={'file'} onChange={getImage} />
                    </div>
                    {progress === 0 ? <></> : <Progress percent={progress} strokeColor={twoColors} />}
                </div >
            </Modal>

        </div>
    )
}
