import React, { useRef, useState } from 'react'
import './style.css'
import logo from '../../imgs/merge.png'
import profile from '../../imgs/star in the sky.jpg'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useAuth } from "../../appcontext/Authcontext"
import { auth, db, storage } from '../../config/Firebase'

const NavD = () => {
    const fileInputRef = useRef(null);
    const { currentUser } = useAuth();
    const [error, setError] = useState(false)
    const [userProfile, setUserProfile] = useState(auth.currentUser?.photoURL || '')

    const handleImageClick = () => {
        // Trigger the file input click when the image is clicked
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        // Handle the file upload logic here, for example, update the profile image
        const selectedFile = e.target.files[0];
        // Perform actions with the selected file, e.g., update the profile image
        // if (selectedFile && currentUser) {
        //     const preview = URL.createObjectURL(selectedFile)
        //     setUserProfile(preview)

        //     const storagePath = `profilePictures/${auth.currentUser.uid}`

        // }


    };

    try {
        const storageRef = ref(storage, `${currentUser.uid}`)
        const uploadTask = uploadBytesResumable(storageRef, selectedFile)

        uploadTask.on(

            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL)
                })

            }


        )

    } catch (er) {
        console.log(er)
    }


    return (

        <div className="navbar mt-5 px-4">

            <div class="text-sm font-semibold text-black-400">
                <img
                    alt="MergeMat logo placeholder"
                    className="h-8 w-8"
                    src={logo}
                />
                <span className="font-bold text-lg">MergeMat</span>
            </div>


            <div className='user'>
                <a href="#" onClick={handleImageClick}>
                    <img
                        alt=""
                        className="image"
                        src={profile}
                        style={{ cursor: PointerEvent }}
                    />
                </a>
                <span class="text-sm font-semibold text-black-400"> Aditi Singh </span>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

            </div>

        </div >



    )
}

export default NavD
