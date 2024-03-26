import React, { useMemo, useState } from 'react'
import Explore from '../Explore'
import Topbar from './topbar'
import "./ExploreLayout.css"
import { getCurrentUser } from '../../api/FirestoreAPI'
import Sidebar from "../../components/Sidebar"
import NotificationBar from '../../components/Notificationbar'



export default function ExploreLayout() {

    const [currentUser, setCurrentUser] = useState({})
    useMemo(() => {

        getCurrentUser(setCurrentUser)

    }, [])



    return (
        <div className='flex col'>
<Sidebar/>

            {/* <div className='topbar'>
                <Topbar />
            </div> */}
            {/* <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                <Sidebar />
            </div> */}


            <div className='explore ml-96 p-8 pr-16'>
                <Explore currentUser={currentUser} />
            </div>
            <NotificationBar />
        </div>
    )
}
