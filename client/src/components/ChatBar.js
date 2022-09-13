import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies()


const ChatBar = ({ socket }) => {
    const API_URL = 'http://localhost:4000'


    const token = cookies.get("TOKEN");
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('newUserResponse', (data) => { setUsers(data) });
    }, [socket, users]);


    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        try {
            const res = await fetch(`${API_URL}/room-select`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': `${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    const roomsArr = data.allRooms
                    for (let i = 0; i < roomsArr.length; i++) {
                        setRooms((room) => [...room, roomsArr[i]])
                    }
                }
                )
        } catch (error) {
            new Error();
        }

    }


    const changeRoom = async (e) => {
        e.preventDefault()
        if (!roomName) {
            return alert('INPUT A ROOM')
        }
        try {
            const res = await fetch(`${API_URL}/room-select`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': `${token}`,
                },
                body: JSON.stringify({
                    roomName: roomName
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    cookies.set("TOKEN", data['token'], {
                        path: "/",
                    })

                    window.location.href = `/${roomName}`
                })
        } catch (error) {
            new Error();
        }
    }

    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                    {users.map((user) => (
                        <p key={user.username}>{user.username}</p>
                    ))}
                </div>
                <h4 className="chat__header">OPEN ROOMS</h4>
                <div className="chat__users" >
                    {rooms.map((room) => (
                        <a key={room._id} href={room.roomName}>{room.roomName}</a>
                    ))}

                </div>
                <form onSubmit={changeRoom}>
                    <input
                        type='text'
                        placeholder='CREATE NEW ROOM'
                        value={roomName}
                        onChange={
                            (e) => setRoomName(e.target.value)
                        } />
                </form>
            </div>
        </div>
    )
}

export default ChatBar