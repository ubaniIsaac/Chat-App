import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users.map((user) => (
                        <p key={user.socketID}>{user.userName}</p>
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