import React, { useMemo, useState } from 'react'
import { getCurrentUser } from '../../api/FirestoreAPI'
import Topbar from './topbar'
import Profile from './Profile'


export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div>
            <Topbar />
            <Profile currentUser={currentUser} />

        </div>
    )
}
