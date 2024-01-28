// Side.js
import React from 'react';

const Side = () => {
    // Dummy data for existing group names
    const existingGroups = ['Group 1', 'Group 2', 'Group 3'];

    return (
        <div className="fixed lg:w-64 h-full bg-gray-800 text-white p-4">
            {/* Search input */}
            <div className="mb-4">
                <input type="text" class="border rounded px-2 py-1" placeholder="Search" />
                <i class="fas fa-search absolute right-2 top-2 text-gray-400"></i>

            </div>
            {/* Create New Group icon */}
            <div className="mb-4">
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            {/* Existing group names */}
            <div>
                <p className="text-sm font-semibold mb-2">Existing Groups:</p>
                <ul>
                    {existingGroups.map((group, index) => (
                        <li key={index} className="mb-2">
                            <a href="#" className="text-gray-300 hover:text-white">
                                {group}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Side;
