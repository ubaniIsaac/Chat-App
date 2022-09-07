import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import socketIO from 'socket.io-client';
import Cookies from 'universal-cookie'
const cookies = new Cookies();



const socket = socketIO.connect('http://localhost:4000');

const ChatPage = (props) => {
    const token = cookies.get("TOKEN")
    console.log(token)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])



    return (

        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">

                <ChatBody />
                <ChatFooter />

            </div>
        </div>
    );
};

export default ChatPage;