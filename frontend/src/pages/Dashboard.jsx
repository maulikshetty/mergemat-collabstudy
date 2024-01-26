import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Notifications from '../components/Notificationbar.jsx'
import './styles/dashboard.css'; // Import a CSS file for styling
import { useAuth } from '../appcontext/Authcontext'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function dashboard() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('')
    const nav = useNavigate();

    return (
      
        <div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
            <body class="h-full bg-gray-100">

            <div class="flex flex-col lg:flex-row h-screen">
            <Sidebar />
            <div class="flex-1 p-6 lg:pl-sidebar lg:pr-notificationbar">
            <div class="flex justify-between items-center mb-6">
            <div class="flex space-x-2 items-center">
                <i class="fas fa-bars text-gray-600"></i>
                <span class="font-semibold text-lg">Dashboard</span>
            </div>
            <div class="flex space-x-4 items-center">
                <i class="fas fa-search text-gray-600"></i>
                <i class="fas fa-bell text-gray-600"></i>
                <i class="fas fa-user-circle text-gray-600"></i>
                <i class="fas fa-th text-gray-600"></i>
                <i class="fas fa-envelope text-gray-600"></i>
            </div>
            
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-2xl font-semibold mb-2">Welcome, {currentUser.firstname} </h2>
            <p class="text-gray-600">Welcome to your dashboard! here is a brief of your groups and reminders below</p>
          </div>

          <div class="mt-6">
                <h2 class="text-xl font-semibold mb-4">My Groups</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div class="bg-white p-4 rounded shadow flex items-center">
                        <img src="https://placehold.co/50x50" alt="Group of people illustration for F27FA - Group 22" class="mr-4"/>
                        <div>
                            <h4 class="font-semibold">F27FA – Group 22</h4>
                            <p class="text-sm text-gray-500">Meeting in progress...</p>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded shadow flex items-center">
                        <img src="https://placehold.co/50x50" alt="Group of people illustration for Software Development" class="mr-4"/>
                        <div>
                            <h4 class="font-semibold">Software Development</h4>
                            <p class="text-sm text-gray-500">Scheduled Meeting</p>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded shadow flex items-center">
                        <img src="https://placehold.co/50x50" alt="Group of people illustration for Mathematics - CW" class="mr-4"/>
                        <div>
                            <h4 class="font-semibold">Mathematics - CW</h4>
                            <p class="text-sm text-gray-500">10 Unread Messages</p>
                        </div>
                    </div>
                </div>
                <button class="text-blue-500 text-sm mt-2">View More Groups</button>
            </div>

            <div class="mt-6">
                <h2 class="text-xl font-semibold mb-4">Reminders</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div class="bg-blue-200 p-4 rounded shadow flex items-center justify-between">
                        <div>
                            <h4 class="font-semibold">Daily French Lessons</h4>
                            <p class="text-sm text-gray-500">35 lessons</p>
                        </div>
                        <i class="fas fa-chevron-circle-right text-blue-500"></i>
                    </div>
                    <div class="bg-orange-200 p-4 rounded shadow flex items-center justify-between">
                        <div>
                            <h4 class="font-semibold">Learn ReactJS</h4>
                            <p class="text-sm text-gray-500">New course available</p>
                        </div>
                        <i class="fas fa-chevron-circle-right text-orange-500"></i>
                    </div>
                    <div class="bg-purple-200 p-4 rounded shadow flex items-center justify-between">
                        <div>
                            <h4 class="font-semibold">Add Reminder</h4>
                            <p class="text-sm text-gray-500">Don't forget your tasks</p>
                        </div>
                        <i class="fas fa-chevron-circle-right text-purple-500"></i>
                    </div>
                </div>
            </div>
        </div>
        <Notifications />
        </div>
        </body>
        </div>
        
    )
}