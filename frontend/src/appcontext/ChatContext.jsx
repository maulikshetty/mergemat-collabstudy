import React, { useContext, useReducer, useEffect } from "react";
import { useAuth } from "./Authcontext";


const ChatContext = React.createContext()


export function useChat() {


    return useContext(ChatContext)
}

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useAuth()


    const INITIAL_STATE = {

        chatId: "null",
        user: {},
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        }
    };


    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    // const value = {
    //     data: state,
    //     dispatch
    // };


    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};