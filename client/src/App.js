import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import RoomSelect from './components/RoomSelect';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

const socket = socketIO.connect('http://localhost:4000');

function App() {


  const API_URL = 'http://localhost:4000'

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
          if (data.token) {
            window.location.href = "/room-select"
          }
          else {
            alert(data.message)
          }
        })
    } catch (error) {
      new Error();
    }


  }

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
            alert(data.error)
          }
        })
    } catch (error) {
      new Error();
    }

  }


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp signup={signup} />}></Route>
        <Route path="/" element={<SignIn login={login} />}></Route>
        <Route path="/room-select" element={cookies.get("TOKEN") ? <RoomSelect /> : <Navigate to="/" replace />}></Route>
        <Route path={`/:roomId`} element={cookies.get("TOKEN") ? <ChatPage socket={socket} /> : <Navigate to="/" replace />}></Route>
      </Routes>
    </Router >
  );
}

export default App