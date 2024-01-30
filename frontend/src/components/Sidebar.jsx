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
        isActive ? "flex items-center space-x-2 text-gray-800 bg-gray-100" : "flex items-center space-x-2 text-gray-800 hover:bg-gray-100";

    return (
        <div className="bg-white p-6 space-y-6 w-full lg:w-64">
            <div className="flex items-center space-x-2">
                <img alt="MergeMat logo placeholder" className="h-8 w-8" src={logo} />
                <span className="font-bold text-lg">MergeMat</span>
            </div>
            <div>
                <div className="text-sm font-semibold text-black-400">
                    {currentUser.firstname} {currentUser.lastname}
                </div>
                <div className="flex space-x-1 text-xs text-gray-400">
                    <span>Favorites</span>
                    <span>Recently</span>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-gray-400">Dashboards</div>
                <div className="space-y-1">
                    <NavLink to="/dashboard" className={linkClass}>
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/group" className={linkClass}>
                        <i className="fas fa-users"></i>
                        <span>My Groups</span>
                    </NavLink>
                    <NavLink to="/personal-files" className={linkClass}>
                        <i className="fas fa-file-alt"></i>
                        <span>Personal Files</span>
                    </NavLink>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-gray-400">Pages</div>
                <div className="space-y-1">
                    <NavLink to="/user-profile" className={linkClass}>
                        <i className="fas fa-user"></i>
                        <span>User Profile</span>
                    </NavLink>
                    <NavLink to="/calendar" className={linkClass}>
                        <i className="fas fa-calendar-alt"></i>
                        <span>Calendar</span>
                    </NavLink>
                </div>
            </div>
            <div className="space-y-2">
                <NavLink to="/settings" className={linkClass}>
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                </NavLink>
                <NavLink to="/explore" className={linkClass}>
                    <i className="fas fa-compass"></i>
                    <span>Explore</span>
                </NavLink>
                <NavLink to="/content" className={linkClass}>
                    <i className="fas fa-align-left"></i>
                    <span>Content</span>
                </NavLink>
                <NavLink to="/messages" className={linkClass}>
                    <i className="fas fa-envelope"></i>
                    <span>Messages</span>
                </NavLink>
                <div className="flex items-center space-x-2 text-red-600 hover:bg-gray-100">
                    <i className="fas fa-sign-out-alt"></i>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}
