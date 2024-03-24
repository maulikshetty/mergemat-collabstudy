import React from 'react';
import { useAuth } from '../appcontext/Authcontext';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../imgs/merge.png';

export default function Sidebar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const nav = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            nav('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    const linkClass = ({ isActive }) => 
        isActive ? "flex items-center space-x-3 py-2 px-3 rounded-md text-gray-800 bg-gray-100" : "flex items-center space-x-3 py-2 px-3 rounded-md text-gray-800 hover:bg-gray-100";

    return (
        <div className="bg-white shadow-md p-6 space-y-6 w-full lg:w-64">
            <div className="flex items-center space-x-3 mb-4">
                <img alt="MergeMat logo" className="h-10 w-10" src={logo} />
                <span className="font-bold text-xl">MergeMat</span>
            </div>
            <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                    <i className="fas fa-user text-gray-600 text-lg"></i>
                    <span className="font-semibold text-lg">{currentUser.firstname} {currentUser.lastname}</span>
                </div>
                <div className="flex space-x-2 text-sm">
                    <span className="font-medium text-gray-600">Favorites</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-400">Recently</span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="font-medium text-gray-600 mb-2 text-lg">Dashboards</div>
                <div className="space-y-2">
                    <NavLink to="/dashboard" className={linkClass}>
                        <i className="fas fa-tachometer-alt text-lg"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/groups" className={linkClass}>
                        <i className="fas fa-users text-lg"></i>
                        <span>Groups</span>
                    </NavLink>
                    <NavLink to="/personal-files" className={linkClass}>
                        <i className="fas fa-file-alt text-lg"></i>
                        <span>Personal Files</span>
                    </NavLink>
                </div>
            </div>
            <div className="space-y-4">
                <div className="font-medium text-gray-600 mb-2 text-lg">Pages</div>
                <div className="space-y-2">
                    <NavLink to="/user-profile" className={linkClass}>
                        <i className="fas fa-user text-lg"></i>
                        <span>User Profile</span>
                    </NavLink>
                    <NavLink to="/calendar" className={linkClass}>
                        <i className="fas fa-calendar-alt text-lg"></i>
                        <span>Calendar</span>
                    </NavLink>
                    <NavLink to="/user-info" className={linkClass}>
                        <i className="fas fa-cog text-lg"></i>
                        <span>Settings</span>
                    </NavLink>
                    <NavLink to="/explore" className={linkClass}>
                        <i className="fas fa-compass text-lg"></i>
                        <span>Explore</span>
                    </NavLink>
                    <NavLink to="/content" className={linkClass}>
                        <i className="fas fa-align-left text-lg"></i>
                        <span>Content</span>
                    </NavLink>
                    <NavLink to="/messages" className={linkClass}>
                        <i className="fas fa-envelope text-lg"></i>
                        <span>Messages</span>
                    </NavLink>
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:bg-gray-100 py-2 px-3 rounded-md w-full">
                        <i className="fas fa-sign-out-alt text-lg"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
