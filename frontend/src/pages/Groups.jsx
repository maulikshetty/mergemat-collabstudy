import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import { db } from '../config/firebase';
import { updateDoc, doc } from 'firebase/firestore';



export default function Groups(){
    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen bg-gray-100">
                {/* Left sidebar */}
                <Sidebar />

                {/* Main content */}
                <div className="flex-grow px-6 py-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">My Groups:</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => window.location.href = '/create'}>Create/Join Group</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {/* Group cards */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <img src="https://placehold.co/300x200" alt="Group of people working together illustration" className="rounded-lg" />
                            <div className="mt-4">
                                <div className="font-semibold">F27FA - Group 22</div>
                                <div className="text-sm text-gray-500">Meeting in progress..</div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/32x32" alt="Group icon" className="h-8 w-8 rounded-full" />
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">18</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600" onClick={() => window.location.href = '/group'}>View</button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <img src="https://placehold.co/300x200" alt="Group of developers discussing over a project illustration" className="rounded-lg" />
                            <div className="mt-4">
                                <div className="font-semibold">Software Development</div>
                                <div className="text-sm text-gray-500">Scheduled Meeting</div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/32x32" alt="Group icon" className="h-8 w-8 rounded-full" />
                                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">4</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600">View</button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <img src="https://placehold.co/300x200" alt="Group of students studying mathematics illustration" className="rounded-lg" />
                            <div className="mt-4">
                                <div className="font-semibold">Mathematics - CW</div>
                                <div className="text-sm text-gray-500">10 Unread Messages</div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center">
                                    <img src="https://placehold.co/32x32" alt="Group icon" className="h-8 w-8 rounded-full" />
                                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2">10</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="w-64">
                {/* Adjust width as needed */}
                <NotificationBar />
            </div>
            </div>
        </div>
    );
};

