import React, { useEffect, useState } from 'react'
import { getConnections } from '../../api/FirestoreAPI'
import Default from "../../imgs/default.jpg"
import { TiUserAdd } from "react-icons/ti";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        getConnections(currentUser.uid, user.id, setIsConnected)
    }, [currentUser.uid, user.id])



    return (

        isConnected ? <></> :
            <div className='grid-child'>
                {user.imageLink ? <img className='connect-img' src={user.imageLink} /> : <img src={Default} className='connect-img' />}
                <p className='connect-name'>{user.firstname} {user.lastname}</p>
                <p className='text-headline'>{user.headline}</p>


                <button onClick={() => getCurrentUser(user.uid)}> <TiUserAdd size={20} />
                    Connect</button>
            </div>
    )
}

