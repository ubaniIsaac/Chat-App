import React, { useState } from 'react'
import '../SignIn.css'


const API_URL = 'http://localhost:4000'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState()
    const [signupResponse, setSignupResponse] = useState('')

    const signup = async (userName, email, password) => {
        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "userName": userName,
                    "email": email,
                    "password": password
                })
            })
                .then((response) => response.json())
                .then((data) => {

                    if (data.status === 'success') {
                        window.location.href = "/"
                    }
                    else {
                        setSuccess(false)
                        setSignupResponse(data.error)
                    }
                })
        } catch (error) {
            new Error();
        }

    }
    const onSubmit = (e) => {
        e.preventDefault()

        if (email
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            && username &&
            password) {
            signup(username, email, password)
        } else {
            alert('Complete all fields')
        }

    }

    return (
        <div className='container'>

            <h6>Already Have an account? <span><a href='/'>Signin</a></span></h6>

            <form onSubmit={onSubmit}>
                {/* <label className="label">Name</label>
                <input className="name" type="text" /> */}
                <label className="label">Username </label>

                <input
                    className="signin"
                    name='username'
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={
                        (e) => setUsername(e.target.value)
                    }></input>


                <label className="label">Email </label>


                <input className="email signin"
                    name='email'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
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

                <button className='btn' type='submit'>SIGN UP</button>

            </form>
            {success === false ? <p>{signupResponse}</p> : <></>}
        </div>
    )
}

export default SignUp