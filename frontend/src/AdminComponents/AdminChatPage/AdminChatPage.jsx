import React, { useContext, useState, useEffect } from 'react'
import './AdminChatPage.css'
import AdminIcon from '../Assets/admin_icon.png'
import {MainContainer, ChatContainer, MessageList, MessageInput, ConversationHeader, Avatar, Message, Sidebar, ConversationList, Conversation} from '@chatscope/chat-ui-kit-react'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { AdminMessageContext } from '../../Context/AdminMessageContext';
import '../../Pages/CSS/AdminPage.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar'

const AdminChatPage = () => {
    const {currentMessage, addMessage, allUsers, currentUserId, setCurrentUserId, currenUsername, setCurrentUsername} = useContext(AdminMessageContext);

const handleConversationClick = (e) => {
    setCurrentUserId(e._id)
    setCurrentUsername(e.username);
}

useEffect(() => {
    console.log(currentMessage);
    console.log(currentUserId);
}, []);

function sendMessage(e){
    if (currentUserId && e){
        console.log(e);
        addMessage(e, false, currentUserId);
    }
}
  return (
    <div className='admin'>
      <AdminSidebar/>
    <div className='chatPage-div'> 
       <MainContainer>
        <Sidebar position='left'>
            <ConversationList>
                {
                    allUsers.length > 0?allUsers.map((e,index)=>{
                        return <Conversation key={index} onClick={()=>handleConversationClick(e)} name={e.username}>
                            <Avatar>
                                <img src={AdminIcon} className='admin-icon' alt="" />
                            </Avatar>
                        </Conversation>
                    }):null
                }
            </ConversationList>
        </Sidebar>
       <ChatContainer>
            <ConversationHeader>
                <Avatar>
                    <img src={AdminIcon} className='admin-icon' alt="" />
                </Avatar>
                <ConversationHeader.Content userName={currenUsername}>

                </ConversationHeader.Content>

            </ConversationHeader>
                
            <MessageList>
                {currentMessage.length > 0 ? currentMessage.map((e,index)=>{
                    return <Message key={index} model={
                        {
                            message: e.content,
                            sentTime: e.timeStamp,
                            sender: 'admin',
                            direction: !e.userMessage?'outgoing':'incoming',
                            position: 'single',
                        }
                    }/>      
                }):null}
            </MessageList>
            {/* <MessageInput placeholder='Type your message here !' onSend={sendMessage}> */}
            <MessageInput placeholder='Type your message here !' onSend={sendMessage}>
            </MessageInput>
        </ChatContainer>
       </MainContainer>
    </div>
    </div>
  )
}

export default AdminChatPage