import React from 'react'
import mmlogo from '../imgs/mmlogo.jpg'
import placeimg from '../imgs/randimage.jpg'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../appcontext/Authcontext'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'


export default function Login() {

  const emailref = useRef()
  const passwordref = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const toast = useToast()
  const [open, setOpen] = useState(false)
  // const [data,setData] = useState({
  //   email:'',
  //   password:'',
  // })

  const toggle = () =>{
    setOpen(!open)
  }
  async function loginuser(e){
    e.preventDefault()
    
  
  try {
    setError('')
    setLoading(true)
    await login(emailref.current.value, passwordref.current.value)

    nav('/dashboard')

  } catch (error) {

    console.error("Failed to create an account", error )
    setError("Failed to create an account")
    toast({
      title: "Incorrect email or password",
      status: "error",
      duration: 3000,
      isClosable: true,
    })
    
  }

  setLoading(false)
  }
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
    <div className="sm:w-1/2">
        <img alt="" src={mmlogo} />
      </div>
      <section className="flex items-center justify-center w-full">

  <div className = "flex rounded-2xl p-5 ">
 
    <div className=" sm:w-1/2 px-16 bg-white rounded-2xl border shadow-lg">
      <h2 className="font-bold font-sans text-xl mt-4">Welcome Back!</h2>
      <h2 className="font-bold font-sans text-2xl mt-4">Login</h2>
      <p className =" font-semibold text-sm mt-2"> Login to mergemat</p>

      <form onSubmit={loginuser} className="flex flex-col gap-4">
        <label className="mt-8 text-lg"htmlFor="email">Email Address</label>
        <input className="p-2 rounded-xl border" type="text" name="email" placeholder="Email" ref={emailref} required ></input>
        <div className="relative">
        <label htmlFor="Password" className="text-lg">Password</label>
        <input className="mt-2 p-2  rounded-xl w-full border" type={(open === false)? 'password' :'text'} name="password" ref={passwordref}  placeholder="Password"></input>
        <div className='text-2xl absolute top-11 right-5'>
                      {
                          (open === false)? <AiFillEye onClick={toggle}/>:
                          <AiFillEyeInvisible onClick={toggle}/>

                      }
                      
                      
        </div>
        </div>
        <button type="submit" className="bg-black rounded-xl text-white py-2">Log in </button>
      <div className="flex justify-between">
        <div>
        <a className ="text-xs"> <Link to="/forgotpassword">Forgot Password</Link></a>
        </div>
      </div>

      <div>
        <p className="text-xs flex items-center justify-center mt-3 mb-4">Don't have an Account?  <a className="font-bold font-sans" href="/register"> Sign Up</a></p>
      </div>
      </form>

    </div>
 
    <div className="w-1/2 p-5 sm:block hidden ">
      <img className = "rounded-2xl" alt="" src={placeimg}/> 
    </div>





  </div>
</section>

</div>  

  )
}
