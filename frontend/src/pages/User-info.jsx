import React from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export default function usersettings() {
    const { currentUser, logout } = useAuth();
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>MergeMat - Personal Info</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
                <style>
                    {`
                    body {
                        font-family: "Inter", sans-serif;
                    }
                `}
                </style>
            </head>
            <body className="bg-gray-100">
                <div className="flex flex-col md:flex-row h-screen">
                    {/* Sidebar */}
                        <Sidebar />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Top bar */}
                        <header className="flex justify-between items-center p-6 bg-white shadow-sm">
                            <div className="flex items-center space-x-4">
                                <button className="text-gray-500 focus:outline-none md:hidden">
                                    <i className="fas fa-bars"></i>
                                </button>
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                            placeholder="Search"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-search text-gray-500"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="text-gray-500 focus:outline-none">
                                    <i className="fas fa-bell"></i>
                                </button>
                                <button className="text-gray-500 focus:outline-none">
                                    <i className="fas fa-cog"></i>
                                </button>
                                <button className="text-gray-500 focus:outline-none">
                                    <i className="fas fa-question-circle"></i>
                                </button>
                            </div>
                        </header>

                        {/* Main section */}
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                            <div className="container mx-auto px-6 py-8">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div className="mb-4 border-b border-gray-200">
                                        <h1 className="text-2xl font-semibold text-gray-900">
                                            Personal info
                                        </h1>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    First Name
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">{currentUser.firstname}</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Last Name
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">{currentUser.lastname}</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email address
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">
                                                        {currentUser.email}
                                                    </p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone numbers
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">971564****14</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <button className="text-sm text-gray-900">
                                                        Click to reset
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">Not provided</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    URL
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">Not provided</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Date of birth
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <p className="text-sm text-gray-900">Not provided</p>
                                                    <button className="text-blue-600 hover:text-blue-500">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="text-white hover:text-white bg-gray-800 hover:bg-black rounded-lg px-4 py-2">
                                                Save
                                            </button>
                                            
                                        </div>
                                        <div className="md:col-span-1 space-y-4">
                                            <div className="bg-gray-50 p-4 rounded-lg shadow">
                                                <div className="flex items-center justify-center">
                                                    <i className="fas fa-lock fa-2x text-gray-400"></i>
                                                </div>
                                                <h3 className="mt-2 text-lg font-medium text-gray-900 text-center">
                                                    Why isn't my info shown here?
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 text-center">
                                                    We're hiding some account details to protect your
                                                    identity.
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg shadow">
                                                <div className="flex items-center justify-center">
                                                    <i className="fas fa-file-alt fa-2x text-gray-400"></i>
                                                </div>
                                                <h3 className="mt-2 text-lg font-medium text-gray-900 text-center">
                                                    Which details can be edited?
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 text-center">
                                                    Details MergeMat uses to verify your identity can't be
                                                    changed. Contact info and some personal details can be
                                                    edited, but we may ask you verify your identity after
                                                    editing.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                
            </body>
        </html>
    );
}

