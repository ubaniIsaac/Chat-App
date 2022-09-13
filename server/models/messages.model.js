const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const chatMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        chatRoom: String,
        message: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        sender: String,
    },
    {
        timestamps: true,
        collection: 'chatMessages'
    }
);

chatMessageSchema.statics.getAllMessages = async function (chatRoom) {
    try {
        const messages = await this.find({ chatRoom }, { 'chatRoom': 0, '__v': 0, 'createdAt': 0, 'updatedAt': 0 })

        return messages
    } catch (error) {
        throw error
    }
}

chatMessageSchema.statics.postMessage = async function (
    message,
    chatRoom,
    sender
) {
    try {
        const sentMessage = await this.create({
            message,
            chatRoom,
            sender
        })
        return sentMessage;
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("ChatMessages", chatMessageSchema)
