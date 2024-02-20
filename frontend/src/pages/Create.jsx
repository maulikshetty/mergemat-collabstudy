import React from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';

function CreateGRP() {
    return (
        <div className="flex h-screen responsive-wrap">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden  bg-gray-100">


                {/* Main Panel */}
                <div className="flex-grow overflow-auto p-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Create Group</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Group Name:</span>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-200 h-10 px-4 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="Name of group" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Add Members</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border border-gray-200 pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500"
                                        placeholder="Select members"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </label>
                            <label className="block cursor-pointer">
                                <span className="text-gray-700">Upload Picture</span>
                                <div className="mt-1 block w-full rounded-md border-2 border-dashed border-gray-300 p-6 text-center">
                                    <i className="fas fa-cloud-upload-alt fa-3x text-gray-300"></i>
                                    <input type="file" className="hidden" />
                                </div>
                            </label>
                            <button className="bg-gray-800 text-white rounded-md px-4 py-2">Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-64'>
            <NotificationBar />
            </div>
        </div>
    );
}

export default CreateGRP;
