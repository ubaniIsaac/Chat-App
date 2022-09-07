import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";
const cookies = new Cookies()



const RoomSelect = ({ socket }) => {
    const API_URL = 'http://localhost:4000'


    const token = cookies.get("TOKEN");
    const { roomId } = useParams();
    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = localStorage.getItem('userName')
        socket.emit('newUser', { username, socketID: socket.id })
        console.log(username)
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
                    console.log(data)
                    cookies.set("TOKEN", data['token'], {
                        path: "/",
                    })

                    navigate(`/${roomName}`)
                })
        } catch (error) {
            new Error();
            console.log(error)
        }



    };


    return (
        <div className='home-container'>
            <form onSubmit={handleSubmit}>
                <input
                    className='room-input'
                    type='text'
                    name='roomName'
                    value={roomName}
                    placeholder='Enter Room'
                    onChange={e => setRoomName(e.target.value)}
                />
                <button
                    className='add-btn'
                    type='submit'
                >
                    Join Room
                </button>

            </form>

        </div>
    )
}

export default RoomSelect