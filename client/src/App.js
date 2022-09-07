<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import RoomSelect from './components/RoomSelect';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
<<<<<<< HEAD
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const socket = socketIO.connect('http://localhost:4000');

function App() {


  const API_URL = 'http://localhost:4000'
  // const navigate = useNavigate()

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
          console.log(data)
          cookies.set("TOKEN", data['token'], {
            path: "/",
          })
          if (data.token) { window.location.href = "/room-select" }
          else {
            alert(data.message)
          }
        })
    } catch (error) {
      new Error();
      console.log(error)
    }


  }

  const signup = async (userName, email, password) => {
=======

const socket = socketIO.connect('http://localhost:4000');
function App() {
  const API_URL = 'http://localhost:4000'

  const login = async (userName, password) => {
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

    const token = res.data.token
    console.log(token)
    return token

  }

  const signup = async (username, email, password) => {
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
<<<<<<< HEAD
        "userName": userName,
=======
        "username": username,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
        "email": email,
        "password": password
      })
    })
  }

<<<<<<< HEAD

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp signup={signup} />}></Route>
        <Route path="/" element={<SignIn login={login} />}></Route>
        <Route path="/room-select" element={cookies.get("TOKEN") ? <RoomSelect socket={socket} /> : <Navigate to="/" replace />}></Route>
        <Route path={`/:roomId`} element={<ChatPage />}></Route>
      </Routes>
    </Router >
=======
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home socket={socket} />}></Route> */}
        <Route path="/room-select" element={<RoomSelect />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/signin" element={<SignIn login={login} socket={socket} />}></Route>
        <Route path="/signup" element={<SignUp signup={signup} />}></Route>
      </Routes>
    </Router>
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
  );
}

export default App