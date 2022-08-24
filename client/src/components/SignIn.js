import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../SignIn.css'

const SignIn = ({ login, socket }) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    // const
    const onSubmit = (e) => {
        e.preventDefault()

        if (userName
            // && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            &&
            password) {

            localStorage.setItem('userName', userName);
            socket.emit('newUser', { userName, socketID: socket.id })
            navigate('/chat');
        } else {
            alert('Insert Email & Password')
        }

        login(userName, password)

    }

    return (
        <div>
            <header className="form-header">
                <h1>Sign in with your Email.</h1>
                <h6>Don't have an account? <span><a href='/signup'>SignUp</a></span></h6>
            </header>
            <form onSubmit={onSubmit}>
                {/* <label className="label">Name</label>
                <input className="name" type="text" /> */}
                <label className="label">Username </label>

                <input className="email signin"
                    name='userName'
                    type="text"
                    placeholder='Usernaame'
                    value={userName}
                    onChange={
                        (e) => setUserName(e.target.value)
                    }
                />
                <label className="label">Password </label>
                <input className="password signin"
                    name='password'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    } />

                <button className='btn' type='submit'>SIGN IN</button>

            </form>
        </div>
    )
}

export default SignIn