import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import Cookies from 'universal-cookie'
import useChat from './useChat';
const cookies = new Cookies();





const ChatPage = ({ socket }) => {

    const { roomId } = useParams();
    const { messages, sendMessage } = useChat(roomId)
    const username = cookies.get('userName')

    useEffect(() => {
        socket.emit('newUser', { username, socketID: socket.id })
    }, [username])

    return (

        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} />
                <ChatFooter />

            </div>
        </div>
    );
};

export default ChatPage;