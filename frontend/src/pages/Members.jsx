import React from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';

    export default function Members() {
        return (
            <body class="bg-gray-100">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <div class="flex flex-col md:flex-row h-screen">
                <Sidebar />

                <div class="flex-1 flex flex-col overflow-hidden">

                    <div class="flex justify-between items-center p-4 bg-white border-b">
                        <div class="flex space-x-4">
                            <button class="text-gray-500 md:hidden" onclick="toggleSidebar()">
                                <i class="fas fa-bars"></i>
                            </button>
                            {/* <div class="font-semibold text-lg">{group && group.groupName}</div> Display group name */}
                            <div class="text-gray-500">Live Collaboration</div>
                            <div class="text-gray-500">Post</div>
                            <div class="text-gray-500">File</div>
                            <div class="text-gray-500">Members</div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="relative">
                                <input type="text" class="border rounded px-2 py-1" placeholder="Search" />
                                <i class="fas fa-search absolute right-2 top-2 text-gray-400"></i>
                            </div>
                            <i class="fas fa-video custom-icon" onClick={() => window.open('/zego')}></i>
                            <i class="fas fa-cog text-gray-600"></i>
                            <i class="fas fa-bell text-gray-600"></i>
                        </div>
                    </div>


                    <div class="flex-1 flex flex-col">

                    </div>
                </div>
            </div>

        </body>
        );
    };

