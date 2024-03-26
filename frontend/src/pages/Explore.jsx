import React from 'react'
import PostUpdate from './Explore/postUpdate'
import "./styles/Explore.css"
import Sidebar from '../components/Sidebar'



export default function Explore({ currentUser }) {
    return (
        <div className='home'>
            <PostUpdate currentUser={currentUser} />


        </div>
    )
}
