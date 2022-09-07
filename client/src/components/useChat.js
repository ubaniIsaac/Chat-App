import { useEffect, useRef, useState } from 'react';
import socketIOClient from "socket.io-client";
import Cookies from "universal-cookie";
const cookies = new Cookies()

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const token = cookies.get("TOKEN");





    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,

            };
            // fetchMessages()
            setMessages((messages) => [...messages, incomingMessage])
        });


        return () => {
            socketRef.current.disconnect();
        };


    }, [roomId]);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${SOCKET_SERVER_URL}/${roomId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    "X-Authorization": token,
                }
            })

            const data = await res.json()
            console.log(data)

            // setMessages(data)
        } catch (error) {
            throw error
        }

    }

    const sendMessage = async (messageBody) => {
        const res = await fetch(`${SOCKET_SERVER_URL}/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "message": messageBody,
                "chatRoom": roomId,
                "sender": localStorage.getItem('userName')
            })
        })

        const data = await res.json()
        console.log(data)

        if (messageBody.trim() && localStorage.getItem('userName')) {
            socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
                body: messageBody,
                name: localStorage.getItem('userName'),
                socketId: socketRef.current.id,
                id: `${socketRef.current.id}${Math.random()}`
            });
        }

    };


    return { messages, sendMessage };
}

export default useChat