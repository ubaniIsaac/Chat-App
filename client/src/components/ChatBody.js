import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useChat from './useChat';
<<<<<<< HEAD
import Cookies from 'universal-cookie'
const cookies = new Cookies();
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


const ChatBody = () => {

    const { roomId } = useParams();
    const { messages, sendMessage } = useChat(roomId)
    const [newMessage, setNewMessage] = useState([])

    const navigate = useNavigate();

    const handleLeaveRoom = () => {
<<<<<<< HEAD
        cookies.remove("TOKEN", { path: "/" });
        localStorage.removeItem('userName');
        navigate('/');
=======
        localStorage.removeItem('userName');
        navigate('/signin');
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
        window.location.reload();
    };

    return (

        <>
            <header className="chat__mainHeader">
                <p>Room: {roomId}</p>
                <button className="leaveChat__btn" onClick={handleLeaveRoom}>
                    LEAVE ROOM
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) =>
                    message.name === localStorage.getItem('userName') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.body}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.body}</p>
                            </div>
                        </div>
                    ))}




                {/*This is triggered when a user is typing*/}
                <div className="message__status">
                    <p>Someone is typing...</p>
                </div>
            </div>
        </>
    )
}

export default ChatBody