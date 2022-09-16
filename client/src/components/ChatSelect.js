import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useChat from './useChat';
import ChatBar from './ChatBar';
// import ChatBody from './ChatBody';
// import ChatFooter from './ChatFooter';
import socketIO from 'socket.io-client';



const socket = socketIO.connect('https://chat-backend-bvqe.onrender.com');

const ChatSelect = (props) => {

    return (

        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                {/* 
                <ChatBody />
                <ChatFooter /> */}

            </div>
        </div>
    );
};

export default ChatSelect;