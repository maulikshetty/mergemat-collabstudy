import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import { db } from '../config/Firebase';
import { updateDoc, doc } from 'firebase/firestore';

export default function usersettings() {
    const [error, setError] = useState('');
    const Updatedemailref = useRef();
    const firstnameref = useRef();
    const lastnameref = useRef();   
    const toast = useToast();
    const { currentUser, logout, resetPassword, updateEmail} = useAuth();

    async function handleSubmit(e) {
        
        setError('');
        let fieldsToUpdate = {};
        const newFirstName = firstnameref.current.value;
        const newLastName = lastnameref.current.value;
        const newEmail = Updatedemailref.current.value;
    
        if (newFirstName && newFirstName !== currentUser.firstName) {
            fieldsToUpdate.firstName = newFirstName;
        }
        if (newLastName && newLastName !== currentUser.lastName) {
            fieldsToUpdate.lastName = newLastName;
        }
        if (newEmail && newEmail !== currentUser.email) {
            fieldsToUpdate.email = newEmail;
        }
        
        if (Object.keys(fieldsToUpdate).length === 0) {
            setError('No changes to update');
            toast({
                title: 'Error',
                description: 'No changes to update',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, fieldsToUpdate);
            toast({
                title: 'Success',
                description: 'User info has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            setError('Failed to update user info');
            toast({
                title: 'Error',
                description: 'Failed to update user info',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            console.error('Failed to update user info', error);
        }
    }


    async function updateEmailhandler() {
        setError('');
        try {
            await updateEmail(Updatedemailref.current.value);
            toast({
                title: 'Success',
                description: 'email has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch(error) {
            setError('Failed to update email');
            console.log(error);
        }
    }

    async function handlepassreset() {
        setError('');
        try {
            await resetPassword(currentUser.email);
            toast({
                title: 'Success',
                description: 'Password reset email has been sent',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch(error) {
            setError('Failed to reset password');
            console.log(error);
        }
    }

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
                            <form onSubmit={handleSubmit}>
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
                                                <input type="text" id="firstname" className="mt-1 flex justify-between items-center rounded-m border-solid border-black" placeholder={currentUser.firstname} ref={firstnameref} />
                                                    
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
                                                <input type="text" id="firstname" className="mt-1 flex justify-between items-center rounded-m border-solid border-black" placeholder={currentUser.lastname} ref={lastnameref}/>
                                                    
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
                                                <input type="text" id="firstname" className="mt-1 w-80 flex justify-between items-center rounded-m border-solid border-black"  placeholder={currentUser.email} ref={Updatedemailref} />
                                                    <button  onClick={updateEmailhandler} className="text-blue-600 hover:text-blue-500">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone numbers
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input type="text" id="firstname" className="mt-1 flex justify-between items-center rounded-m border-solid border-black" placeholder="Not Provided" />
                                                
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
                                                    <button onClick={handlepassreset} className="text-sm text-gray-900">
                                                        Click to reset
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
                                            <button type = 'submit'  className="text-white hover:text-white bg-gray-800 hover:bg-black rounded-lg px-4 py-2">
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
                            </form>
                        </main>
                    </div>
                </div>
                
            </body>
        </html>
    );
}

