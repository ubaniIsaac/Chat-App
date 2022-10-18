import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import RoomSelect from './components/RoomSelect';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cookies from 'universal-cookie'
import Home from './components/Home';
const cookies = new Cookies();

const socket = socketIO.connect('https://iceu-chat-back.fly.dev/');

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/room-select" element={cookies.get("TOKEN") ? <RoomSelect /> : <Navigate to="/signin" replace />}></Route>
        <Route path={`/:roomId`} element={cookies.get("TOKEN") ? <ChatPage socket={socket} /> : <Navigate to="/signin" replace />}></Route>
      </Routes>
    </Router >
  );
}

export default App