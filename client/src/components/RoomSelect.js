import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "universal-cookie";
const cookies = new Cookies()



const RoomSelect = () => {
    const API_URL = 'https://chat-backend-bvqe.onrender.com'


    const token = cookies.get("TOKEN");
    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([])

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

    useEffect(() => {
        fetchRooms()
    }, [])


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
        <div className='roomselect__container'>

            <h2>Select existing Chat-Room or create new room</h2>

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
                            <li className='room__list'><a className='room-links' href={room.roomName}>{room.roomName}</a></li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoomSelect