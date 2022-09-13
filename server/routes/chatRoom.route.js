const express = require('express');
const { authorization } = require('../middlewares/auth')



const { createRoom, getAllRooms } = require('../controllers/chatRoom.controller');

const chatRoomRouter = express.Router();


module.exports = app => {
    chatRoomRouter.post('/room-select', authorization, createRoom)
    chatRoomRouter.get(`/room-select`, authorization, getAllRooms)
    // chatRoomRouter.get(`/:room-select`, authorization, getAllRooms)

    app.use('/', chatRoomRouter)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}

