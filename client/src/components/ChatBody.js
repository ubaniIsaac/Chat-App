import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import useChat from './useChat';
import Cookies from 'universal-cookie'
const cookies = new Cookies();


const ChatBody = ({ messages }) => {

    const { roomId } = useParams();
    const [newMessage, setNewMessage] = useState([])
    // const lastMessageRef = useRef(null)

    const navigate = useNavigate();

    const handleLogOut = () => {
        cookies.remove('userName');
        cookies.remove("TOKEN", { path: "/" });
        navigate('/');
        window.location.reload();
    };
    // useEffect(() => {
    //     lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }, [messages])



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
                                <p>{message.sender}</p>
                                <div className="message__recipient">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        ))}



                    {/* <div ref={lastMessageRef} /> */}

                    {/*This is triggered when a user is typing*/}
                    <div className="message__status">
                        <p>Someone is typing...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBody