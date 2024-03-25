import React, { useState } from 'react';
import { useAuth } from '../appcontext/Authcontext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../imgs/merge.png';

export default function Sidebar() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const nav = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isVerticallyCollapsed, setIsVerticallyCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setIsVerticallyCollapsed(window.innerWidth < 1000);
        };
    
        handleResize(); // Call it initially to set the initial state
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            <>
            {isVerticallyCollapsed && (
                <div className="relative top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between space-x-3">
                    <img alt="MergeMat logo" className="h-10 w-10" src={logo} />
                    <i
                        className={`fas fa-bars text-gray-600 text-lg cursor-pointer`}
                        onClick={() => setIsVerticallyCollapsed(false)}
                    ></i>
                </div>
            )}
            <div
                className={`h-screen bg-white shadow-md ${
                    isVerticallyCollapsed ? 'hidden' : 'flex flex-col justify-between '
                } ${isExpanded || isVerticallyCollapsed ? (screenWidth < 1000 ? 'w-full z-40' : 'w-64') : 'w-20'} transition-width duration-200`}
            >
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                  <div className={`space-y-6 p-4 ${isExpanded && !isVerticallyCollapsed ? 'w-full' : ''}`}>
                    <div className="flex items-center space-x-3 mb-4">
                        <img alt="MergeMat logo" className="h-10 w-10" src={logo} />
                        {isExpanded && <span className="font-bold text-xl">MergeMat</span>}
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-3">
                            <i className="fas fa-user text-gray-600 text-lg"></i>
                            {isExpanded && <span className="font-semibold text-lg">{currentUser.firstname} {currentUser.lastname}</span>}
                        </div>
                        {isExpanded && (
                            <div className="flex space-x-2 text-sm">
                                <span className="font-medium text-gray-600">Username : {currentUser.username}</span>
                            </div>
                        )}
                    </div>
                            <div className="space-y-4">
                                <div className={`font-medium text-gray-600 mb-2 ${isExpanded ? 'text-lg' : 'text-sm text-center'}`}>
                                    {isExpanded ? 'Dashboards' : 'DB'}
                                </div>
                                <div className="space-y-2">
                                    <NavLink to="/dashboard" className={linkClass}>
                                        <i className={`fas fa-tachometer-alt text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Dashboard</span>}
                                    </NavLink>
                                    <NavLink to="/groups" className={linkClass}>
                                        <i className={`fas fa-users text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Groups</span>}
                                    </NavLink>
                                    <NavLink to="/personal-files" className={linkClass}>
                                        <i className={`fas fa-file-alt text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Personal Files</span>}
                                    </NavLink>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className={`font-medium text-gray-600 mb-2 ${isExpanded ? 'text-lg' : 'text-sm text-center'}`}>
                                    {isExpanded ? 'Pages' : 'PG'}
                                </div>
                                <div className="space-y-2">
                                    <NavLink to="/user-profile" className={linkClass}>
                                        <i className={`fas fa-user text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>User Profile</span>}
                                    </NavLink>
                                    <NavLink to="/calendar" className={linkClass}>
                                        <i className={`fas fa-calendar-alt text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Calendar</span>}
                                    </NavLink>
                                    <NavLink to="/user-info" className={linkClass}>
                                        <i className={`fas fa-cog text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Settings</span>}
                                    </NavLink>
                                    <NavLink to="/explore" className={linkClass}>
                                        <i className={`fas fa-compass text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Explore</span>}
                                    </NavLink>
                                    <NavLink to="/content" className={linkClass}>
                                        <i className={`fas fa-align-left text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Content</span>}
                                    </NavLink>
                                    <NavLink to="/messages" className={linkClass}>
                                        <i className={`fas fa-envelope text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Messages</span>}
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-600 hover:bg-gray-100 py-2 px-3 rounded-md w-full"
                                    >
                                        <i className={`fas fa-sign-out-alt text-lg ${!isExpanded && 'mx-auto'}`}></i>
                                        {isExpanded && <span>Logout</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto p-4">
                        <button
                        onClick={() => {
                            if (screenWidth < 1000) {
                                setIsVerticallyCollapsed(!isVerticallyCollapsed);
                            } else {
                                setIsExpanded(!isExpanded);
                            }
                        }}
                        className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-md w-full"
                    >
                        <i
                            className={`fas ${
                                isExpanded || isVerticallyCollapsed
                                    ? 'fa-times'
                                    : screenWidth < 1000
                                    ? 'fa-bars'
                                    : 'fa-chevron-right'
                            }`}
                        ></i>
                        {(isExpanded || isVerticallyCollapsed) && (
                            <span className="ml-2">Collapse</span>
                        )}
                    </button>
                        </div>
                        </div>
                    </>
                
        );
}

