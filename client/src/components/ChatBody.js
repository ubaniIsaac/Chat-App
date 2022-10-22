import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useChat from './useChat';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const API_URL = 'https://chat-backend-bvqe.onrender.com'

const ChatBody = ({ messages }) => {

    const { roomId } = useParams();
    const [newMessage, setNewMessage] = useState([])
    const lastMessageRef = useRef(null)

    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })
        } catch (error) {
            new Error();
        }
        cookies.remove('userName');
        cookies.remove("TOKEN", { path: "/" });
        navigate('/signin');
        window.location.reload();
    };
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])



    return (

        <>
            <div>
                <header className="chat__mainHeader">
                    <p>{roomId}</p>
                    <button className="leaveChat__btn" onClick={handleLogOut}>
                        LOG OUT
                    </button>
                </header>

                <div className="message__container">
                    {messages.map((message) =>
                        message.sender === cookies.get('userName') ? (
                            <div className="message__chats" key={message._id}>
                                <p className="sender__name">You</p>
                                <div className="message__sender">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="message__chats" key={message._id}>
                                <p className='recipient__name'>{message.sender}</p>
                                <div className="message__recipient">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}
                    <div ref={lastMessageRef} />

                </div>
            </div>
        </>
    )
}

export default ChatBody