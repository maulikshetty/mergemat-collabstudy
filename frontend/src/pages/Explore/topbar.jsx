import React, { useEffect, useMemo, useState } from 'react'
import './topbar.css'
import Logo from "../../imgs/merge.png"
import { IoHome } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { IoBriefcase } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import Default from "../../imgs/default.jpg"
import { useNavigate } from "react-router-dom"
import ProfilePopup from './ProfilePopup';
import SearchUsers from './SearchUsers';
import { getAllUsers, getCurrentUser } from '../../api/FirestoreAPI';
import { auth } from '../../config/Firebase';

export default function topbar() {

    const [popupVisible, setPopupVisible] = useState(false);
    const [users, setUsers] = useState([]);
    let nav = useNavigate()
    const [isSearch, setIsSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const [filteredUsers, setFilteredUsers] = useState("")
    const [recentUser, setRecentUser] = useState([])

    useMemo(() => {

        getCurrentUser(setRecentUser)

    }, [])


    const goToRoute = (route) => {
        nav(route);
    }

    const displayPopup = () => {
        setPopupVisible(!popupVisible);
    };

    const openUser = (user) => {
        nav("/profile", {
            state: {
                id: user.id,
                email: user.email,
            },
        });
    };



    const handleSearch = () => {

        if (searchInput !== '') {
            let searched = users.filter((user) => {
                return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase())
            })

            setFilteredUsers(searched);

        } else {
            setFilteredUsers(users);
        }
    }

    useEffect(() => {
        let debounced = setTimeout(() => {
            handleSearch()

        }, 1000)
        return () => clearTimeout(debounced)


    }, [searchInput])




    useEffect(() => {
        getAllUsers(setUsers)
    }, [])



    return (
        <div className='topbar-main'>
            {popupVisible ? (
                <div className="popup-position">
                    <ProfilePopup />
                </div>
            ) : (
                <></>
            )}


            <img className='logo' src={Logo} alt="MergeMat" />


            {isSearch ? <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput} /> :

                <div className='icons'>

                    <IoIosSearch className='react-icon' size={25} onClick={() => setIsSearch(true)} />

                    <IoHome className='react-icon' size={30} onClick={() => goToRoute('/explore')} />
                    <HiUsers className='react-icon' size={30} onClick={() => goToRoute('/connections')} />
                    <IoBriefcase className='react-icon' size={30} />
                    <BiSolidMessageDetail className='react-icon' size={30} />
                    <IoIosNotifications className='react-icon' size={30} />
                </div>
            }
            <img className='user' src={recentUser?.imageLink} alt="User" onClick={displayPopup} />

            {searchInput.length === 0 ? <></> : <div className='search-result'>
                {filteredUsers.length === 0 ? (
                    <div className='search-inner'> No Results Found...</div>) : (

                    filteredUsers.map((user) => (
                        <div className='search-inner' onClick={() => openUser(user)}>
                            {user.imageLink ? <img src={user.imageLink} /> : <img src={Default} />}
                            <p className='name'>{user.firstname} {user.lastname}</p>


                        </div>
                    ))
                )}

            </div>}



        </div>

    )
}

