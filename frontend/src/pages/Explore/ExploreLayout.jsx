import React, { useMemo, useState } from 'react'
import Explore from '../Explore'
import Topbar from './topbar'
import "./ExploreLayout.css"
import { getCurrentUser } from '../../api/FirestoreAPI'
import Sidebar from "../../components/Sidebar"


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
            {/* <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                <Sidebar />
            </div> */}


            <div className='explore'>
                <Explore currentUser={currentUser} />
            </div>
        </div>
    )
}
