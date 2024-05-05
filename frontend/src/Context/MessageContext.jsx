import React, { createContext, useState, useRef, useContext } from 'react'
import { useEffect } from 'react';
import io from 'socket.io-client';
import { AuthenticationContext } from './AuthenticationContext';

export const MessageContext = createContext(null);

const MessageContextProvider = (props) => {
    const {isAdmin} = useContext(AuthenticationContext);

    const [socket, setNewSocket] = useState(io.connect('/',
    {
        auth: {
            token: localStorage.getItem('auth-token')
        }
    }));

    const [allMessages, setAllMessages] = useState({});
    useEffect(() => {

        async function getMessage() {
            await fetch('/getmessages',{
                method:'GET',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setAllMessages(data));
        }

        if (!isAdmin) {
            console.log('test context');
        // Get all messages from database
        getMessage();
        
        // Kết nối đến WebSocket server    
        socket.on('getMessage', () => {
            // Get all messages from database
            fetch('/getmessages',{
                method:'GET',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setAllMessages(data));
        });

        socket.on('connect', () => {
            console.log('Connected to server');

            // Lắng nghe tin nhắn từ server
            socket.on('message', (data) => {
                console.log(data);
            });

            // Gửi tin nhắn đến server
            socket.emit('message', 'Hello from the client!');   
        });
        return () => {
            // Ngắt kết nối khi component unmount
            console.log('Disconnect from server');
            socket.disconnect();
        };
        }
        
        
    }, [isAdmin]);

    const addMessage = (message, myMessage, mytoken) => {

        console.log(message);
        // Add message to database
        if(localStorage.getItem('auth-token')){
            
            socket.emit('addMessage', {content: message, userMessage: myMessage, user_id: mytoken}, (data) => {
                console.log(data);
            });

        }
    }
    const contextValue = {allMessages, addMessage}
    return (
        <MessageContext.Provider value={contextValue}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider