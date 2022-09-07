import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useChat from './useChat';


const ChatFooter = () => {

    const { roomId } = useParams();
    const [newMessage, setNewMessage] = useState([])
    const { messages, sendMessage } = useChat(roomId)



    const handleSendMessage = (e) => {
        e.preventDefault()
        sendMessage(newMessage)
        setNewMessage("")


    }

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>

    )
}

export default ChatFooter