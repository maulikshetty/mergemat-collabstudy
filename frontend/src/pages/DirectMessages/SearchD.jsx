import React from 'react'
import './style.css'
import profile from '../../imgs/star in the sky.jpg'

const SearchD = () => {
    return (
        <div className='search mt-4'>
            <div className='searchForm'>
                <input type="text" placeholder="Find a user" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="userChat mt-10">
                <img src={profile} alt="" />
                <div className="userChatInfo">
                    <span style={{ fontWeight: 'bold', color: 'black' }} >Jane Austen</span>
                </div>
            </div>




        </div >
    )
}

export default SearchD
