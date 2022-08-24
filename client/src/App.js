import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import RoomSelect from './components/RoomSelect';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      })
    })
  }

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
  );
}

export default App