import React, { useState } from 'react'
import './topbar.css'
import Logo from "../../imgs/merge.png"
import { IoHome } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { IoBriefcase } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import User from "../../imgs/default.jpg"
import { useNavigate } from "react-router-dom"
import ProfilePopup from './ProfilePopup';

export default function topbar({ currentUser }) {

    const [popupVisible, setPopupVisible] = useState(false);
    const [users, setUsers] = useState([]);
    let nav = useNavigate()

    const goToRoute = (route) => {
        nav(route);
    }

    const displayPopup = () => {
        setPopupVisible(!popupVisible);
    };

    const openUser = (user) => {
        navigate("/profile", {
            state: {
                id: user.id,
                email: user.email,
            },
        });
    };

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
            <div className='icons'>
                <IoIosSearch className='react-icon' size={25} />
                <IoHome className='react-icon' size={30} onClick={() => goToRoute('/explore')} />
                <HiUsers className='react-icon' size={30} onClick={() => goToRoute('/connections')} />
                <IoBriefcase className='react-icon' size={30} />
                <BiSolidMessageDetail className='react-icon' size={30} />
                <IoIosNotifications className='react-icon' size={30} />
            </div>
            <img className='user' src={User} alt="User" onClick={displayPopup} />


        </div>
    )
}

