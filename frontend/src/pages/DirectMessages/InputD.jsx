import React, { useState } from 'react'
import './style.css'
import Attach from '../../imgs/attachment.svg'
import Picture from '../../imgs/picture.svg'

import { useAuth } from '../../appcontext/Authcontext'
import { useChat } from '../../appcontext/Chatcontext'
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../config/Firebase'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const InputD = () => {


    const [text, setText] = useState("")
    const [img, setImg] = useState(null);

    const { currentUser } = useAuth()
    const { data } = useChat()

    const handleSend = async () => {
        if (img) {

            const storageRef = ref(storage, uuid())

            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        })
                    })
                }
            )

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }


        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("")
        setImg(null)
    }



    return (
        <div className='input'>
            <input type="text" placeholder="Type your message..." onChange={e => setText(e.target.value)} value={text} />
            <div className="icons">
                <img src={Attach} alt="Attach" className="icon" style={{ cursor: 'pointer' }}
                    onClick={() => document.getElementById('file').click()}
                />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />

                <label htmlFor="file">
                    <img src={Picture} alt="Picture" className="icon" />
                </label>
            </div>
            <button className="send-button" onClick={handleSend}>Send</button>

        </div >

    )
}

export default InputD
