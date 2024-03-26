import React, { useState } from 'react'
import "./ProfileEdit.css"
import { editProfile } from '../../api/FirestoreAPI'
import { RxCross2 } from "react-icons/rx";

export default function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState(currentUser)

    const getInput = (event) => {
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input });
    }

    const updateProfileData = async () => {

        await editProfile(currentUser?.uid, editInputs)
        await onEdit();


    }



    return (
        <div className='profileCard'>
            <div className="edit-btn"><RxCross2 size={25} className='cancel' onClick={onEdit} /></div>
            <div className='profile-edit-input'>
                <label>First name</label>
                <input onChange={getInput} className="edit-input" placeholder='Firstname'
                    name='firstname'
                    value={editInputs.firstname} />

                <label>Last name</label>

                <input onChange={getInput} className="edit-input" placeholder='Lastname'
                    name='lastname'
                    value={editInputs.lastname} />
                <label>Headline</label>

                <input onChange={getInput} className="edit-input" placeholder='Headline' name='headline'
                    value={editInputs.headline} />

                <label>Country</label>
                <input onChange={getInput} className="edit-input" placeholder='Country' name='location'
                    value={editInputs.location} />

                <label>Company</label>
                <input onChange={getInput} className="edit-input" placeholder='Company' name='company'
                    value={editInputs.company} />

                <label>Education</label>
                <input onChange={getInput} className="edit-input" placeholder='Education' name='college'
                    value={editInputs.college} />

                <label>Website</label>
                <input onChange={getInput} className="edit-input" placeholder='URL' name='website'
                    value={editInputs.website} />

                <label>About </label>
                <textarea onChange={getInput} className="edit-textarea" placeholder='About me' rows={5} name='about'
                    value={editInputs.about} />

                <label>Skills </label>
                <input onChange={getInput} className="edit-input" placeholder='Skills' rows={5} name='skills'
                    value={editInputs.skills} />



            </div>
            <div className='save-container'>
                <button className="save-btn" onClick={updateProfileData}>Save</button>
            </div>

        </div>
    )
}
