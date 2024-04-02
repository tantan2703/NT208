import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client';


export const MessageContext = createContext(null);

const MessageContextProvider = (props) => {
    const [allMessages, setAllMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState({messages: []});
    const [allUsers, setAllUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currenUsername, setCurrentUsername] = useState('');
    const [socket, setNewSocket] = useState(io.connect('http://localhost:8888',
    {
        auth: {
            token: 'admin',
        }
    }));
    const [reload, setReload] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {

            console.log('Connected to server');
            socket.emit('message', 'Hello from the client!');

            socket.on('message', (message) => {
                console.log(message);
            });
        });
        socket.on('getMessage', () => {
            // Get all messages from database
            fetch('http://localhost:4000/admingetmessages',{
                method:'GET',
            }).then((response)=>response.json())
            .then((data)=>setAllMessages(data));
        });
        // Get all users from database
        try {
            fetch('http://localhost:4000/allusers',{
                        method:'GET',
                    }).then((response)=>response.json())
                    .then((data)=>setAllUsers(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (currentUserId){
            setCurrentMessage(allMessages.filter((e)=>e.user_id === currentUserId)[0].messages);
        }
    }, [currentUserId, allMessages]);

    useEffect(() => {
        fetch('http://localhost:4000/admingetmessages',{
            method:'GET',
        }).then((response)=>response.json())
        .then((data)=>setAllMessages(data));
    }, [reload]);

    

    const addMessage = (message, myMessage, currentUserId) => {
        console.log(message);
        // Add message to database
        socket.emit('adminAddMessage', {content: message, userMessage: myMessage, user_id: currentUserId}, (data) => {
            console.log(data);
            setReload(!reload);
        });

    }
    const contextValue = {allMessages, addMessage, allUsers, currentUserId, setCurrentUserId, currenUsername, setCurrentUsername, reload, setReload, currentMessage}
    return (
        <MessageContext.Provider value={contextValue}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider