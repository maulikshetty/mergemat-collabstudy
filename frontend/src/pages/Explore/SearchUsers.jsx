import React from 'react'
import "./SearchUsers.css"
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function SearchUsers({ setIsSearch, setSearchInput }) {
    return (
        <div className='search-users'>
            <input placeholder='Search Users...' onChange={(event) => setSearchInput(event.target.value)} />
            <IoIosCloseCircleOutline className='close-search' size={25} onClick={() => {
                setIsSearch(false); setSearchInput("");
            }}
            />

        </div >
    )
}
