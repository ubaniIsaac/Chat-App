const chatRoomModel = require('../models/chatRoom.model')


exports.createRoom = async (req, res) => {
    try {
        const { roomName } = req.body;
        const { chatInitiator } = req.body;
        const chatRoom = await chatRoomModel.createRoom(roomName, chatInitiator)
        return res.status(200).json({ success: true, chatRoom })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
