import React, { createContext, useState, useRef } from 'react'
import { useEffect } from 'react';
import io from 'socket.io-client';

export const MessageContext = createContext(null);

const MessageContextProvider = (props) => {
    const socketRef = useRef(null);

    const token = localStorage.getItem('auth-token');
    const [allMessages, setAllMessages] = useState({});
    useEffect(() => {
        console.log('test context');
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


        socketRef.current = io.connect('/',
    {
        auth: {
            token: localStorage.getItem('auth-token')
        }
    });

    socketRef.current = io.connect('/',
    {
        auth: {
            token: localStorage.getItem('auth-token')
        }
    });
        // Kết nối đến WebSocket server    
        socketRef.current.on('getMessage', () => {
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

        socketRef.current.on('connect', () => {
            console.log('Connected to server');

            // Lắng nghe tin nhắn từ server
            socketRef.current.on('message', (data) => {
                console.log(data);
            });

            // Gửi tin nhắn đến server
            socketRef.current.emit('message', 'Hello from the client!');   
        });
        return () => {
            // Ngắt kết nối khi component unmount
            console.log('Disconnect from server');
            socketRef.current.disconnect();
        };
    }, []);

    const addMessage = (message, myMessage, mytoken) => {
        console.log(message);
        // Add message to database
        if(localStorage.getItem('auth-token')){
            
            socketRef.current.emit('addMessage', {content: message, userMessage: myMessage, user_id: mytoken}, (data) => {
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