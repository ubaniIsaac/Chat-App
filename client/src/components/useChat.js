import { useEffect, useRef, useState } from 'react';
import socketIOClient from "socket.io-client";
<<<<<<< HEAD
import Cookies from "universal-cookie";
const cookies = new Cookies()
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
<<<<<<< HEAD
    const token = cookies.get("TOKEN");



=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,

            };
<<<<<<< HEAD
            // fetchMessages()
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
            setMessages((messages) => [...messages, incomingMessage])
        });


        return () => {
            socketRef.current.disconnect();
        };
<<<<<<< HEAD


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

=======
    }, [roomId]);

    const sendMessage = (messageBody) => {
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
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