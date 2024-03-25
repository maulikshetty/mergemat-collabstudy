import React, { useEffect, useState } from 'react'
import "./ConnectionComponent.css"
import { getAllUsers, addConnection, getConnections } from '../../api/FirestoreAPI'
import ConnectedUsers from './ConnectedUsers'

export default function ConnectionsComponent({ currentUser }) {

    const [users, setUsers] = useState([])



    const getCurrentUser = (id) => {

        addConnection(currentUser.uid, id)

    }

    useEffect(() => {
        getAllUsers(setUsers)
    })





    return (
        <div className='connections-main'>
            {users.map((user) => {
                return user.id === currentUser.uid ? <></> : <ConnectedUsers key={user.id} user={user} currentUser={currentUser} getCurrentUser={getCurrentUser} />;
            })}
        </div>

    )
}
