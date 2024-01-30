import React from 'react'
import SideD from './SideD'
import ChatD from './ChatD'
import SidePanel from './SidePanel'
import './style.css'

const DirectM = () => {
    return (
        <div className="bg-white h-screen flex items-center justify-center mx-auto">
            <SidePanel />
            <div id="container" className="mx-auto">
                <SideD />
                <ChatD />






            </div>

        </div>
    )
}

export default DirectM
