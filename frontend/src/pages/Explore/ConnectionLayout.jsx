import React, { useMemo, useState } from 'react'
import Topbar from './topbar'
import Connections from './Connections'
import { getCurrentUser } from '../../api/FirestoreAPI'


export default function ConnectionLayout() {

    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
        getCurrentUser(setCurrentUser);
    }, [])


    return (
        <div>
            <Topbar />
            <Connections currentUser={currentUser} />


        </div>
    )
}
