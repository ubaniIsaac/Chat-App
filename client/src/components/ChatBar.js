import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const ChatBar = ({ socket }) => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
        console.log(users)
    }, [socket, users]);

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users.map((user) => (
                        <p key={user.socketID}>{user.username}</p>
                    ))}
                </div>
                <h4 className="chat__header">OPEN ROOMS</h4>
                <div className="chat__users">
                    <p>Room 1</p>
                    <p>Room 2</p>
                    <p>Room 3</p>
                    <p>Room 4</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBar