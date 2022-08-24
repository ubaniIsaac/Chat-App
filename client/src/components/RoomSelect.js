import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RoomSelect = () => {

    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        // onAdd(roomName)

        navigate(`/${roomName}`)

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