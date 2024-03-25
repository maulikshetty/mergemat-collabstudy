import { storage } from "../config/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { editProfile } from "./FirestoreAPI";



export const uploadImage = (file, id, setModalOpen, setProgress, setCurrentImage) => {
    const profilePicsRef = ref(storage, `profileImagesExplore/${file.name}`)

    const uploadTask = uploadBytesResumable(profilePicsRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        setProgress(progress)


    }, (err) => { console.log(err) }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            editProfile(id, { imageLink: response })
            setModalOpen(false)
            setCurrentImage({})
            setProgress(0)

        })
    })

}


export const uploadPostImage = (file, setPostImage, setProgress) => {
    const postPicsRef = ref(storage, `postImagesExplore/${file.name}`)

    const uploadTask = uploadBytesResumable(postPicsRef, file)

    uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

        setProgress(progress)


    }, (err) => { console.log(err) }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            setPostImage(response)

        })
    })

}

