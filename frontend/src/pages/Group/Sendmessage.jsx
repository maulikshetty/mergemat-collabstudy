import React, { useState, useEffect, alert } from 'react'
import { useAuth } from '../../appcontext/Authcontext'
import { serverTimestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../config/Firebase'




const Sendmessage = () => {
    const [value, setValue] = useState("")
    const { currentUser } = useAuth()



    const handleSendmessage = async (e) => {
        e.preventDefault()

        if (value.trim() === "") {
            alert("Enter valid message!")
            return;
        }

        try {
            const { uid, firstname, lastname } = currentUser;
            await addDoc(collection(db, "message"), {
                text: value,
                firstname: firstname,
                lastname: lastname,
                createdAt: serverTimestamp(),
                uid
            })

        } catch (error) {
            console.log(error)
        }
        console.log(value)
        setValue("")

    }




    return (
        <div className="fixed bottom-0 w-full"  >
            <form onSubmit={handleSendmessage} className="containerWrap flex" style={{ marginLeft: '20%' }}>
                <input value={value} onChange={e => setValue(e.target.value)} className="text-gray-800  border-gray-400 input w-full focus:outline-none rounded" type="text" placeholder='...' />
                <button type="submit" class="button" className="w-auto bg-gray-800 text-white rounded-r-lg px-5 text-small">Send</button>

            </form>
        </div>
    )
}

export default Sendmessage


