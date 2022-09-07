const express = require('express');
const { authorization } = require('../middlewares/auth')



const { createRoom } = require('../controllers/chatRoom.controller');

const chatRoomRouter = express.Router();


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

