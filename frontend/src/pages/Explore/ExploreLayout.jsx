import React, { useMemo, useState } from 'react'
import Explore from '../Explore'
import Topbar from './topbar'
import "./ExploreLayout.css"
import { getCurrentUser } from '../../api/FirestoreAPI'


export default function ExploreLayout() {

    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {

        getCurrentUser(setCurrentUser)

    }, [])

    return (
        <div>
            <div className='topbar'>
                <Topbar currentUser={currentUser} />
            </div>
            <div className='explore'>
                <Explore currentUser={currentUser} />
            </div>
        </div>
    )
}
