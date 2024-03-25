import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../appcontext/Authcontext';
import { useToast } from '@chakra-ui/react';
import { auth, db } from '../config/Firebase';
import { updateDoc, doc } from 'firebase/firestore';

export default function usersettings() {
    const [error, setError] = useState('');
    const Updatedemailref = useRef();
    const firstnameref = useRef();
    const lastnameref = useRef();  
    const Updatedaddress = useRef();
    const updatedphone = useRef();
    const updatedurl = useRef();
    const updateddob = useRef();
    const myuser = auth.currentUser;
    const toast = useToast();
    const { currentUser, logout, resetPassword, updateEmail} = useAuth();




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

    async function handleSubmit() {
        setError('');
        const firstName = firstnameref.current.value;
        const lastName = lastnameref.current.value;
        const email = Updatedemailref.current.value;
        const address = Updatedaddress.current.value;
        const phone = updatedphone.current.value;
        const url = updatedurl.current.value;
        const dob = updateddob.current.value;
        const updatedFields = {};

        if (firstName) {
            updatedFields.firstname = firstName;
        }

        if (lastName) {
            updatedFields.lastname = lastName;
        }

        if (email) {
            updatedFields.email = email;

        }

        if (address) {
            updatedFields.address = address;
        }
        
        if (phone) {
            updatedFields.phone = address;
        }

        if (url) {
            updatedFields.url = url;
        }

        if (dob) {
            updatedFields.dob = dob;
        }

        if (Object.keys(updatedFields).length === 0) {
            setError('Please fill in at least one field');
            toast({
                title: 'Error',
                description: 'Please fill in at least one field',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const userDocRef = doc(db, 'users', myuser.uid);
            await updateDoc(userDocRef, updatedFields);
            await updateEmail(email);
            toast({
                title: 'Success',
                description: 'User info has been updated upon verification',
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

    const [isToastShown, setIsToastShown] = useState(false);

    function handleDOBFocus() {
        if (!currentUser.dob && !isToastShown) {
            setIsToastShown(true);
            toast({
                title: 'Warning',
                description: 'Once edited, cannot be changed',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
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
                        <div class="flex justify-between items-center p-4 bg-white border-b">
                        <div class="flex space-x-4">
                            <button class="text-gray-500 md:hidden" onclick="toggleSidebar()">
                                <i class="fas fa-bars"></i>
                            </button>
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-semibold">My Info:</h1>
                            </div>
                        </div>
                    </div>

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
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.firstname}
                                                    ref={firstnameref}
                                                />
                                                    

                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Last Name
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.lastname}
                                                    ref={lastnameref}
                                                />
                                                    

                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email address
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.email}
                                                    ref={Updatedemailref}
                                                />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone numbers
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.phone ? currentUser.phone : "Not Provided"}
                                                    ref={updatedphone}
                                                />                                                

                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                    <div className="mt-1 flex justify-between items-center">
                                                        <button onClick={handlepassreset} className="w-full text-sm text-gray-900 bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none px-8 py-2 rounded-md">
                                                            Click to reset
                                                        </button>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.address ? currentUser.address : "Not Provided"}
                                                    ref={Updatedaddress}
                                                />

                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    URL
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="url"
                                                    id="url"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    placeholder={currentUser.url ? currentUser.url : "Not Provided"}
                                                    ref={updatedurl}
                                                />

                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Date of birth
                                                </label>
                                                <div className="mt-1 flex justify-between items-center">
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    className="mt-1 w-full px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
                                                    value={currentUser.dob}
                                                    ref={updateddob}
                                                    onFocus={handleDOBFocus}
                                                />

                                                </div>
                                            </div>
                                            <button type = 'submit' onClick={handleSubmit} className="text-white hover:text-white bg-gray-800 hover:bg-black rounded-lg px-4 py-2">
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

