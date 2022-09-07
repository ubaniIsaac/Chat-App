import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../SignIn.css'

const SignUp = ({ signup }) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    // const
    const onSubmit = (e) => {
        e.preventDefault()

        if (email
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            &&
            password) {
            signup(username, email, password)
            navigate('/signin')
        } else {
            alert('Insert Email & Password')
        }

    }

    return (
        <div>
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
        </div>
    )
}

export default SignUp