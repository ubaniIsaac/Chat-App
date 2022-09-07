const express = require('express');
<<<<<<< HEAD
const { authorization } = require('../middlewares/auth')

=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


const { createRoom } = require('../controllers/chatRoom.controller');

const chatRoomRouter = express.Router();

<<<<<<< HEAD

module.exports = app => {
    chatRoomRouter.post('/room-select', authorization, createRoom)

    app.use('/', chatRoomRouter)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}

=======
chatRoomRouter.post('/', createRoom)

module.exports = chatRoomRouter
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
