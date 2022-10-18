import { useEffect, useRef, useState } from 'react';
import socketIOClient from "socket.io-client";
import Cookies from "universal-cookie";
const cookies = new Cookies()

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "https://iceu-chat-back.fly.dev/";

const useChat = (roomId) => {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const token = cookies.get("TOKEN")


    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });
        fetchMessages()

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,

            };
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

                .then((response) => response.json())
                .then((data) => {
                    const spreadOutMessage = data.messages
                    const allMessages = {
                        ...spreadOutMessage,
                        ownedByCurrentUser: spreadOutMessage.sender === cookies.get('userName'),

                    };

                    for (let i = 0; i < spreadOutMessage.length; i++) {
                        setMessages((messages) => [...messages, spreadOutMessage[i]])
                    }
                }
                )
        } catch (error) {
            throw error
        }

    }

    const sendMessage = async (messageBody) => {
        const res = await fetch(`${SOCKET_SERVER_URL}/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "X-Authorization": token,

            },
            body: JSON.stringify({
                "message": messageBody,
                "chatRoom": roomId,
                "sender": cookies.get('userName')
            })
        })

        const data = await res.json()

        if (messageBody.trim() && cookies.get('userName')) {
            socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
                message: messageBody,
                sender: cookies.get('userName'),
                socketId: socketRef.current.id,
                _id: `${socketRef.current.id}${Math.random()}`
            });
        }

    };


    return { messages, sendMessage };
}

export default useChat