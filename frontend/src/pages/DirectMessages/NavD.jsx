import React, { useRef, useState } from 'react'
import './style.css'
import logo from '../../imgs/merge.png'
import profile from '../../imgs/star in the sky.jpg'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { useAuth } from "../../appcontext/Authcontext"
import { auth, db, storage } from '../../config/Firebase'
import { doc, setDoc } from 'firebase/firestore'
import Back from "../../imgs/back.png"

const NavD = () => {
    const fileInputRef = useRef(null);
    const { currentUser } = useAuth()
    const [userProfile, setUserProfile] = useState(auth.currentUser?.photoURL || '')

    const handleImageClick = () => {
        // Trigger the file input click when the image is clicked
        fileInputRef.current.click();

    };

    const handleFileChange = async (e) => {
        fileInputRef.current.click();
        // Handle the file upload logic here, for example, update the profile image
        const selectedFile = e.target.files[0];
        // Perform actions with the selected file, e.g., update the profile image
        if (selectedFile && auth.currentUser) {
            const preview = URL.createObjectURL(selectedFile)
            setUserProfile(preview)

            const storagePath = `profilePictures/${auth.currentUser.uid}/${selectedFile.name}`
            const imageRef = ref(storage, storagePath)

            try {
                //Upload image to firebase
                const snapshot = await uploadBytes(imageRef, selectedFile)

                //get url from firebase, permanent
                const permanentUrl = await getDownloadURL(snapshot.ref)

                //update user's profile with permanent url
                await updateProfile(auth.currentUser, {
                    photoURL: permanentUrl
                })

                //update firebase doc
                const userRef = doc(db, "users", auth.currentUser.uid)
                await setDoc(userRef, {
                    photoURL: permanentUrl
                }, { merge: true });

                const userPhotoRef = doc(db, "userChats", auth.currentUser.uid)
                await updateDoc(userPhotoRef, {
                    [`${combinedId}.userInfo.photoURL`]: permanentUrl,
                });


                console.log("Profile photo updated successfully")

                //update profile picture in user's screen with permanent url 
                setUserProfile(permanentUrl)

                //clean up preview url as it's not needed and changes are saved in doc
                URL.revokeObjectURL(preview)

            } catch (er) {
                console.log("Error updating profile photo", er)
            }


        }
    };


    return (

        <div className="navbar mt-5 px-4">

            <div className='user'>
                <a href="/dashboard"> <img src={Back} alt="" style={{ width: '20px', height: '20px' }} /></a>
                <a onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <img
                        alt=""
                        className="image"
                        src={userProfile}

                    />
                </a>
                <span class="text-sm font-semibold text-black-400"> {currentUser.firstname} {currentUser.lastname} </span>


            </div>

        </div >



    )
}

export default NavD
