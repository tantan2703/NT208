import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client';


export const AdminMessageContext = createContext(null);

const AdminMessageContextProvider = (props) => {
    const [allMessages, setAllMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState({messages: []});
    const [allUsers, setAllUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currenUsername, setCurrentUsername] = useState('');
    const [socket, setNewSocket] = useState(io('/socket.io',
    {
        auth: {
            token: 'admin',
        },
    }));
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setNewSocket(io('/socket.io',
        {
            auth: {
                token: 'admin',
            },
        }));

        socket.on('connect', () => {

            console.log('Connected to server');
            socket.emit('message', 'Hello from the client!');

            socket.on('message', (message) => {
                console.log(message);
            });
        });
        socket.on('getMessage', () => {
            // Get all messages from database
            fetch('/admingetmessages',{
                method:'GET',
            }).then((response)=>response.json())
            .then((data)=>setAllMessages(data));
        });
        // Get all users from database
        try {
            fetch('/allusers',{
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
        console.log('currentMessage: ', currentMessage);
    }, [currentUserId, allMessages]);

    useEffect(() => {
        fetch('/admingetmessages',{
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
        <AdminMessageContext.Provider value={contextValue}>
            {props.children}
        </AdminMessageContext.Provider>
    )
}

export default AdminMessageContextProvider