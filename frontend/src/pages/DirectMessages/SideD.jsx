import React from 'react'
import NavD from './NavD'
import SearchD from './SearchD'
import ChatsD from './ChatsD'

const SideD = () => {
    return (
        <div className='sidebar'>
            <NavD />
            <SearchD />
            <ChatsD />

        </div>
    )
}

export default SideD
