const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const mongoose = require("mongoose")
require("dotenv").config()
require('./config/mongo')


const app = express()

app.use(cors());



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: 'Chat Application Homepage' })
});



require('./routes/chatRoom.route')(app);
require('./routes/user.router')(app);
require('./routes/messages.route')(app);
require('./routes/file.route')(app); // will implement file sharing at a later time

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT = process.env.PORT;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
app.set('port', PORT)
let users = [];

io.on("connection", (socket) => {

    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on('newUser', (data) => {
        users.push(data)
        users = users.filter((v, i, a) => a.findIndex(v2 => ['username'].every(k => v2[k] === v[k])) === i)

        io.emit('newUserResponse', users)
    })

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {

        users = users.filter((user) => user.socketID !== socket.id)

        io.emit('newUserResponse', users)
        socket.disconnect();
        socket.leave(roomId);

    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});