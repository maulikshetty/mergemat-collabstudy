import React from 'react'
import Sidebar from "../components/Sidebar.jsx";
import './styles/settings.css'


function Settings() {
  return (

        //<meta charset="UTF-8">
    //<meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    //<title>MergeMat Account Settings</title>
    
    //<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    //<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
    //<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    //<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    //<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    //<link rel="manifest" href="site.webmanifest">
   
<div>

<script src="https://cdn.tailwindcss.com"></script>
<body class="bg-gray-100">
    <div class="min-h-screen flex flex-col md:flex-row">
      
        <div class="bg-white shadow-md md:w-64">
          
         <Sidebar />   
        </div>

 
        <div class="flex-1 p-10">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">Account Settings</h1>
                <div class="flex space-x-4 items-center">
                    <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
                    <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-sm text-gray-600">Aditya Lolip, aditya@gmail.com · <a href="#" class="text-blue-600">Go to profile</a></div>
            </div>
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       
                <div class="bg-white p-6 shadow-sm rounded-lg setting-card">
                    <div class="flex items-center space-x-3 mb-4">
                        <i class="fas fa-user-circle fa-2x text-gray-400"></i>
                        <h2 class="text-lg font-medium">Personal info</h2>
                    </div>
                    <p class="text-sm text-gray-600">Provide personal details and how we can reach you</p>
                </div>
                <div class="bg-white p-6 shadow-sm rounded-lg setting-card">
                    <div class="flex items-center space-x-3 mb-4">
                        <i class="fas fa-lock fa-2x text-gray-400"></i>
                        <h2 class="text-lg font-medium">Login & security</h2>
                    </div>
                    <p class="text-sm text-gray-600">Update your password and secure your account</p>
                </div>
                <div class="bg-white p-6 shadow-sm rounded-lg setting-card">
                    <div class="flex items-center space-x-3 mb-4">
                        <i class="fas fa-cogs fa-2x text-gray-400"></i>
                        <h2 class="text-lg font-medium">Privacy & Settings</h2>
                    </div>
                    <p class="text-sm text-gray-600">Manage your personal data, connected services, and data sharing settings</p>
                </div>
                <div class="bg-white p-6 shadow-sm rounded-lg setting-card">
                    <div class="flex items-center space-x-3 mb-4">
                        <i class="fas fa-globe fa-2x text-gray-400"></i>
                        <h2 class="text-lg font-medium">Global preferences</h2>
                    </div>
                    <p class="text-sm text-gray-600">Set your default language, currency, and timezone</p>
                </div>
                <div class="bg-white p-6 shadow-sm rounded-lg setting-card">
                    <div class="flex items-center space-x-3 mb-4">
                        <i class="fas fa-bell fa-2x text-gray-400"></i>
                        <h2 class="text-lg font-medium">Notifications</h2>
                    </div>
                    <p class="text-sm text-gray-600">Choose notification preferences and how you want to be contacted</p>
                </div>
            </div>
            <div class="mt-6 text-sm">
                <a href="#" class="text-blue-600">Need to deactivate your account?</a>
                <span class="text-gray-600">Take care of that now</span>
            </div>
        </div>
    </div>
</body>

</div>
  )
}

export default Settings