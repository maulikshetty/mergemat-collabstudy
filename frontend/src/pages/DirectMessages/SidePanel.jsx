import React from 'react';
import { useAuth } from "../../appcontext/Authcontext"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imgs/merge.png'

export default function SidePanel() {
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
        <div class="bg-gray-900 p-6 space-y-6 h-full lg:w-64 rounded-lg" >

            <div className="flex items-center space-x-2">
                <img
                    alt="MergeMat logo placeholder"
                    className="h-8 w-8"
                    src={logo}
                />
                <span className="font-bold text-white text-lg">MergeMat</span>
                <div />

            </div>

            <div>
                <div class="text-sm font-semibold text-white"> {currentUser.firstname} {currentUser.lastname}</div>
                <div class="flex space-x-1 text-xs text-white">
                    <span>Favorites</span>
                    <span>Recently</span>
                </div>
            </div>
            <div class="space-y-2">
                <div class=" text-white">Dashboards</div>
                <div class="space-y-1">
                    <a href="/dashboard" classname="flex items-center space-x-2 text-gray-800">
                        <i class="fas fa-tachometer-alt"></i>
                        <span class="text-gray-400"> Dashboard</span>
                    </a>
                    <a href="/group" className="flex items-center space-x-2 text-white">
                        <i className="fas fa-users"></i>
                        <span class="text-gray-400">My Groups</span>
                    </a>
                    <div class="flex items-center space-x-2 text-gray-800">
                        <a href='/directmessages'>
                            <i class="fas fa-envelope"></i>
                            <span class="text-gray-400">Direct Messages</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div class=" text-white">Pages</div>
                <div class="space-y-1">
                    <div class="flex items-center space-x-2 text-gray-800">
                        <i class="fas fa-calendar-alt"></i>
                        <span class="text-gray-400">Calendar</span>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex items-center space-x-2 text-white">
                    <i class="fas fa-cog"></i>
                    <span class="text-gray-400">Settings</span>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="fas fa-compass"></i>
                    <span class="text-gray-400">Explore</span>
                </div>
                <a href="/content" className="flex items-center space-x-2 text-white">
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
