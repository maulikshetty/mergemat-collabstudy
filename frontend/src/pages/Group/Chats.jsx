import React from 'react'
import Nav from './Nav'
import Chatbox from './Chatbox'
import Sendmessage from './Sendmessage'
import { useAuth } from "../../appcontext/Authcontext"
import Side from "./Side"


export default function Chats() {
    const { currentUser } = useAuth();
    console.log(currentUser.firstname)
    return (
        <div>
            <Nav />
            <Side />
            <Chatbox />
            <Sendmessage />
        </div>
    )
}
