const http = require('http')
const express = require('express')
const cors = require('cors')
<<<<<<< HEAD
const bodyParser = require('body-parser')
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


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
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

require('./routes/chatRoom.route')(app);
require('./routes/user.router')(app);
require('./routes/messages.route')(app);
=======
app.use(express.urlencoded({ extended: false }));

app.use('/', chatRoomRouter)
require('./routes/user.router')(app);
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

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
<<<<<<< HEAD
        console.log(users)

        io.in(roomId).emit('newUserResponse', users)
=======
        // console.log(users)

        io.emit('newUserResponse', users)
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    })

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {

        users = users.filter((user) => user.socketID !== socket.id)
<<<<<<< HEAD
        console.log('disconnected', users)
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

        io.emit('newUserResponse', users)
        socket.disconnect();
        socket.leave(roomId);
<<<<<<< HEAD
=======
        console.log(users)
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});