import React, { useMemo, useState } from 'react'
import "./ProfilePopup.css"
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../api/FirestoreAPI';
import Button from './ButtonPopUp';
import { auth } from '../../config/Firebase';

export default function ProfilePopup() {

    let nav = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, [])



    return (
        <div className='popupCard'>
            <div className='nameVP'>
                <p>{currentUser.firstname} </p>
                <p> {currentUser.lastname} </p>
            </div>
            <p className='heading'>{currentUser.headline}</p>


            <Button title="View Profile" onClick={() => nav("/profile", { state: { id: auth.currentUser?.uid } })} />
        </div>
    )
}


