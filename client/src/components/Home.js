import React from 'react'
import '../Home.css'

const Home = () => {
    return (
        <div className="home">
            <section className="top-bar">
                <nav className="flex items-center ml-auto">
                    <a href="/signup" className="btn btn_primary uppercase ml-5">Register</a>
                    <a href="/signin" className="btn btn_primary uppercase ml-5">Login</a>
                </nav>
            </section>

            <main>
                <div>
                    <h2 className="text-5xl">
                        Welcome to ICeU Chat App
                    </h2>
                    <p> Login / Register to get started</p>
                </div>

            </main>

            {/* </div>
            <div className="home-container">
                <div className="text">Hi,</div>
                <ul className='welcome-list'>
                    <li className='welcome-type'><span>Welcome to my chat app</span></li>
                </ul>



            </div >
            <div className="links" >
                <div ><a href="/signup">SIGNUP</a></div>
                <div ><a href="/signin">SIGNIN</a></div> */}
        </div>
    )
}

export default Home