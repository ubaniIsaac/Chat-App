const chatRoomModel = require('../models/chatRoom.model')
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env
=======
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1


exports.createRoom = async (req, res) => {
    try {
        const { roomName } = req.body;
<<<<<<< HEAD
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
=======
        const { chatInitiator } = req.body;
        const chatRoom = await chatRoomModel.createRoom(roomName, chatInitiator)
        return res.status(200).json({ success: true, chatRoom })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    }
}
