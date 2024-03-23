import React from 'react';
import { useAuth } from '../appcontext/Authcontext'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/merge.png'





export default function Sidebar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('')
    const nav = useNavigate();

    async function handleLogout() {
        setError('')
        try {
            await logout()
            nav('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    const [isOpen, setisOpen] = useState(false);

    const toggle = () => {
        setisOpen(!isOpen);
    };

    return (
        <div class="bg-white p-6 space-y-6 w-full lg:w-64" >
            <div className="flex items-center space-x-2">
                <img
                    alt="MergeMat logo placeholder"
                    className="h-8 w-8"
                    src={logo}
                />
                <span className="font-bold text-lg">MergeMat</span>
                <div />

            </div>

            <div>
                <div class="text-sm font-semibold text-black-400"> {currentUser.firstname} {currentUser.lastname}</div>
                <div class="flex space-x-1 text-xs text-gray-400">
                    <span>Favorites</span>
                    <span>Recently</span>
                </div>
            </div>
            <div class="space-y-2">
                <div class=" text-gray-400">Dashboards</div>
                <div class="space-y-1">
                    <a href="/dashboard" classname="flex items-center space-x-2 text-gray-800">
                        <i class="fas fa-tachometer-alt"></i>
                        <span> Dashboard</span>
                    </a>
                    <a href="/group" className="flex items-center space-x-2 text-gray-800">
                        <i className="fas fa-users"></i>
                        <span>My Groups</span>
                    </a>
                    <div class="flex items-center space-x-2 text-gray-800">
                        <a href='/directmessages'>
                            <i class="fas fa-envelope"></i>
                            <span>Direct Messages</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div class=" text-gray-400">Pages</div>
                <div class="space-y-1">
                    <div class="flex items-center space-x-2 text-gray-800">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Calendar</span>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex items-center space-x-2 text-gray-800">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-800">
                    <a href='/explore'>
                        <i class="fas fa-compass"></i>

                        <span>Explore</span>
                    </a>
                </div>
                <a href="/content" className="flex items-center space-x-2 text-gray-800">
                    <i className="fas fa-align-left"></i>
                    <span>Content</span>
                </a>
                <div class="flex items-center space-x-2 text-red-600">
                    <i class="fas fa-sign-out-alt"></i>
                    <button onClick={handleLogout} >Logout</button>
                </div>
            </div>
        </div>

    );
}





