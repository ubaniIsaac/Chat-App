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

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/room-select" element={cookies.get("TOKEN") ? <RoomSelect /> : <Navigate to="/" replace />}></Route>
        <Route path={`/:roomId`} element={cookies.get("TOKEN") ? <ChatPage socket={socket} /> : <Navigate to="/" replace />}></Route>
      </Routes>
    </Router >
  );
}

export default App