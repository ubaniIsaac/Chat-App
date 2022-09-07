<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
=======
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChat from './useChat';
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import socketIO from 'socket.io-client';
<<<<<<< HEAD
import Cookies from 'universal-cookie'
const cookies = new Cookies();
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1



const socket = socketIO.connect('http://localhost:4000');

const ChatPage = (props) => {
<<<<<<< HEAD
    const token = cookies.get("TOKEN")
    console.log(token)
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


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