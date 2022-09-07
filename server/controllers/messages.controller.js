const messageModel = require('../models/messages.model')

<<<<<<< HEAD
exports.postMessage = async (req, res) => {
    try {
        const { chatRoom } = req.params
        const { message, sender } = req.body;
        const sentMessage = await messageModel.postMessage(message, chatRoom, sender)
        return res.status(200).json({
            success: true,
            sentMessage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }

}

exports.getAllMessages = async (req, res) => {
    try {
        const { chatRoom } = req.params
        const messages = await messageModel.getAllMessages(chatRoom);
        return res.status(200).json({
            messages
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
=======
exports.postMessage
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
