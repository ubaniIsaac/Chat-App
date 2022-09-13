import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";
const cookies = new Cookies()



const RoomSelect = () => {
    const API_URL = 'http://localhost:4000'


    const token = cookies.get("TOKEN");
    const { roomId } = useParams();
    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([])

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


    const handleSubmit = async (e) => {
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

                    navigate(`/${roomName}`)
                })
        } catch (error) {
            new Error();
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
            <div >
                {rooms.map((room) =>
                (
                    <div key={room._id}>
                        <ul>
                            <li><a href={room.roomName}>{room.roomName}</a></li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoomSelect