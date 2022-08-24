const express = require('express');


const { createRoom } = require('../controllers/chatRoom.controller');

const chatRoomRouter = express.Router();

chatRoomRouter.post('/', createRoom)

module.exports = chatRoomRouter
