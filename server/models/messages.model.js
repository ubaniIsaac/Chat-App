const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const chatMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
<<<<<<< HEAD
        chatRoom: String,
        message: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        sender: String,
=======
        chatRoomId: String,
        message: mongoose.Schema.Types.Mixed,
        type: String,
        postedByUser: String,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    },
    {
        timestamps: true,
        collection: 'chatMessages'
    }
);

<<<<<<< HEAD
chatMessageSchema.statics.getAllMessages = async function (chatRoom) {
    try {
        const messages = await this.find({ chatRoom })
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
=======
chatMessageSchema.statics.postMessage = async function (
    message,
    postedByUser
) {
    try {
        const post = await this.create({
            chatRoomId,
            message,
            postedByUser
        })
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("ChatMessages", chatMessageSchema)
