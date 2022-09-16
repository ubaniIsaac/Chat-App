import React from 'react'
import '../Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className="home-container">
                <div className="text">Hi,</div>
                <ul className='welcome-list'>
                    <li className='welcome-type'><span>Welcome to my chat app</span></li>
                </ul>



            </div >
            <div className="links" >
                <div ><a href="/signup">SIGNUP</a></div>
                <div ><a href="/signin">SIGNIN</a></div>

            </div >
        </div>
    )
}

export default Home