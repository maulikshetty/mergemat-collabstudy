import React from 'react'
import mmlogo from '../imgs/mmlogo.jpg'
import placeimg from '../imgs/randimage.jpg'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
// { auth } from '../config/Firebase';
//import { db } from '../config/Firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../appcontext/Authcontext'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

export default function Register() {
  const nav = useNavigate();
  const emailref = useRef();
  const passwordref = useRef();
  const firstnameref = useRef();
  const lastnameref = useRef();
  const { signup } = useAuth()
  const confirmpasswordref = useRef();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  
  const toggle = () => {
    setOpen(!open)
  }
  const toggle1 = () => {
    setOpen1(!open1)
  }

  function generateUsername(firstName, lastName) {
    const randomNumber = Math.floor(Math.random() * 10000); // generates a random number between 0 and 9999
    const username = `${firstName.charAt(0)}${lastName.charAt(0)}${randomNumber}`;
    return username;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(passwordref.current.value)) {
      setError('Password must be at least 8 characters long and contain an uppercase letter and a number');
      toast({
      title: 'Error',
      description: 'Password must be at least 8 characters long and contain an uppercase letter and a number',
      status: 'error',
      duration: 3000,
      isClosable: true,
      });
      return; // Stop the function if the password doesn't meet the requirements
    }

    if (passwordref.current.value !== confirmpasswordref.current.value) {
      setError('Passwords do not match');
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Stop the function if the passwords don't match
    }

    try {
      setError('');
      setLoading(true);
      const username = generateUsername(firstnameref.current.value, lastnameref.current.value);
      await signup(
        emailref.current.value,
        passwordref.current.value,
        firstnameref.current.value,
        lastnameref.current.value,
        username
      );
      toast({
        title: 'Success',
        description: 'Account created successfully, please verify your email address to login.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      nav('/login');
    } catch (error) {
      console.error("Failed to create an account", error);
      setError("Failed to create an account");
      toast({
        title: 'Error',
        description: 'Failed to create an account',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  }


  return (

    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
    <div className="sm:w-1/2">
        <img alt="" src={mmlogo} />
      </div>
      <section className="flex items-center justify-center w-full">
        <div className=" flex rounded-2xl p-5">

          <div className="sm:w-1/2 px-16 bg-white rounded-2xl border">
            <h2 className="font-bold font-sans text-xl mt-4">Welcome!</h2>
            <p className="font-bold font-sans text-2xl  mt-4 mb-4">Signup to Mergemat</p>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="text" id="email" className="mt-1 p-3 block w-full rounded-xl border " placeholder="Enter your email" ref={emailref} required />
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstname" className="mt-1 p-3 block w-full rounded-xl border " placeholder="Enter your first name" ref={firstnameref} required />
              <label className="block text-sm font-medium text-gray-700">last Name</label>
              <input type="text" id="lastname" className="mt-1 p-3 block w-full rounded-xl border " placeholder="Enter your last name" ref={lastnameref} required />
              <div className='relative'>
                <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type={(open === false)? 'password' :'text'} id="password" className="mt-1 p-3 block w-full rounded-xl border " placeholder="Set your password" ref={passwordref} required />
              <div className='text-2xl absolute top-10 right-5'>
                      {
                          (open === false)? <AiFillEye onClick={toggle}/>:
                          <AiFillEyeInvisible onClick={toggle}/>

                      }    
              </div>
              </div>
              <div className='relative'>
              <label className="block text-sm font-medium text-gray-700">Confirm your Password</label>
              <input type={(open1 === false)? 'password' :'text'} id="cpassword" className="mt-1 p-3 block w-full rounded-xl border " placeholder="Confirm your password" ref={confirmpasswordref} required />
              <div className='text-2xl absolute top-10 right-5'>
                      {
                          (open1 === false)? <AiFillEye onClick={toggle1}/>:
                          <AiFillEyeInvisible onClick={toggle1}/>

                      }    
              </div>
              </div>
              <button type="submit" disabled={loading} className="bg-black rounded-xl mt-3 w-full text-white py-2">Sign Up</button>
              <p className="text-xs flex items-center justify-center mt-3 mb-4">Have an Account Already? <a className="font-bold font-sans ml-2" href="/login">Login</a></p>
            </form>
          </div>
          <div className="w-full sm:w-1/2 p-5 sm:block hidden">
           <img className="rounded-2xl w-full" alt="" src={placeimg} />
          </div>

        </div>
      </section>

    </div>
  )
}