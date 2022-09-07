import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom';

=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

const ChatBar = ({ socket }) => {

    const [users, setUsers] = useState([]);
<<<<<<< HEAD
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
        console.log(users)
=======

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    }, [socket, users]);

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users.map((user) => (
<<<<<<< HEAD
                        <p key={user.socketID}>{user.username}</p>
=======
                        <p key={user.socketID}>{user.userName}</p>
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
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