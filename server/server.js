const http = require('http')
const express = require('express')
const cors = require('cors')


require('./config/mongo')

const chatRoomRouter = require('./routes/chatRoom.route')


const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}));

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
app.set('port', PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', chatRoomRouter)
require('./routes/user.router')(app);

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
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
        users.push(data);
        // console.log(users)

        io.emit('newUserResponse', users)
    })

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {

        users = users.filter((user) => user.socketID !== socket.id)

        io.emit('newUserResponse', users)
        socket.disconnect();
        socket.leave(roomId);
        console.log(users)

    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});