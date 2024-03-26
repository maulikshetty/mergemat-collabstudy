import { useState } from 'react'
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from '../src/pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from './appcontext/Authcontext'
import Dashboard from './pages/Dashboard'
import Content from './pages/Content'
import Group from './pages/Group'
import Zego from './pages/Zego'
import ContentIn from './pages/Content-in'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './config/Privateroute'
import Explore from './pages/Explore/ExploreLayout'
import ProfileLayout from './pages/Explore/ProfileLayout'
import ConnectionLayout from './pages/Explore/ConnectionLayout'
import Messages from './pages/Messages'
import Usersettings from './pages/User-info'
import Calendar from './pages/Calender'
import Groups from './pages/Groups'
import CreateGRP from './pages/Create'
import Members from './pages/Members'
import Files from './pages/Files'
import Contentwhite from './pages/Contentwhite'
import Contenteditor from './pages/Contenteditor'
import ContentRichText from './pages/ContentRichText'
import Pfiles from './pages/Pfiles'
import { NotificationProvider } from './components/NotificationContext';


function App() {


  return (
    <AuthProvider>
      <NotificationProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <ChakraProvider position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/content' element={<PrivateRoute><Content /></PrivateRoute>} />
        <Route path='/group/:groupId' element={<PrivateRoute><Group /></PrivateRoute>} />
        <Route path='/zego' element={<PrivateRoute><Zego /></PrivateRoute>} />
        <Route path='/content-in' element={<PrivateRoute><ContentIn /></PrivateRoute>} />
        <Route path='/messages' element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path='/user-info' element={<PrivateRoute><Usersettings /></PrivateRoute>} />
        <Route path='/calendar' element={<PrivateRoute><Calendar /></PrivateRoute>} />
        <Route path='/groups' element={<PrivateRoute><Groups /></PrivateRoute>} />
        <Route path='/create' element={<PrivateRoute><CreateGRP /></PrivateRoute>} />
        <Route path='/group/:groupId/members' element={<PrivateRoute><Members /></PrivateRoute>} />
        <Route path= '/group/:groupId/files' element={<PrivateRoute><Files/></PrivateRoute>}/>
        <Route path='/content/whiteboard/:groupId' element={<PrivateRoute><Contentwhite /></PrivateRoute>} />
        <Route path='/contentwhite' element={<PrivateRoute><Contentwhite /></PrivateRoute>} />
        <Route path='/contenteditor' element={<PrivateRoute><Contenteditor /></PrivateRoute>} />
         <Route path='/content/doc/:groupId' element={<PrivateRoute><ContentRichText /></PrivateRoute>} />
        <Route path='/personal-files' element={<PrivateRoute><Pfiles /></PrivateRoute>} />                                
        <Route path='/explore' element={<PrivateRoute><Explore /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><ProfileLayout /></PrivateRoute>} />
        <Route path='/connections' element={<PrivateRoute><ConnectionLayout /></PrivateRoute>} />
      </Routes>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App;
