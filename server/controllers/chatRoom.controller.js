const chatRoomModel = require('../models/chatRoom.model')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env


exports.createRoom = async (req, res) => {
    try {
        const { roomName } = req.body;
        const chatRoom = await chatRoomModel.createRoom(roomName)
        const payload = {
            room: {
                roomName: roomName
            }
        }
        jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
            if (err) throw err
            res.status(200).send({
                message: "Logged in Successfully",
                room: {
                    roomName: roomName
                },
                token
            })
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
        throw error
    }
}

exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await chatRoomModel.getAllRooms()
        return res.status(200).json({
            allRooms
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}