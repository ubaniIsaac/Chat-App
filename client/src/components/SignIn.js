import React, { useState } from 'react'
import '../SignIn.css'
import Cookies from "universal-cookie";
const cookies = new Cookies()

const API_URL = 'https://chat-backend-bvqe.onrender.com'
const SignIn = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [loginResponse, setLoginResponse] = useState('')


    const login = async (userName, password) => {
        try {
            const res = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    "userName": userName,
                    "password": password
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    cookies.set("TOKEN", data['token'], {
                        path: "/",
                    })
                    if (!data.token) {
                        setSuccess(false)
                        setLoginResponse(data.message)

                    }
                    else {
                        setSuccess(true)
                        window.location.href = "/room-select"
                    }
                })
        } catch (error) {
            new Error();
        }


    }


    const onSubmit = (e) => {
        e.preventDefault()

        if (userName && password) {

            cookies.set('userName', userName);
            login(userName, password)
        } else {
            setLoginResponse('Insert Email & Password')
        }


    }

    return (
        <div className='container'>
            <header className="form-header">
                <h1>Sign in with your Username.</h1>
                <h6>Don't have an account? </h6><span><a href='/signup'>SignUp</a></span>
            </header>
            <form onSubmit={onSubmit}>
                <label className="label">Username </label>

                <input className="email signin"
                    name='userName'
                    type="text"
                    placeholder='Username'
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
            {success === false ? <p>{loginResponse}</p> : <></>}
        </div>
    )
}

export default SignIn