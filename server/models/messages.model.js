const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const chatMessageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        chatRoomId: String,
        message: mongoose.Schema.Types.Mixed,
        type: String,
        postedByUser: String,
    },
    {
        timestamps: true,
        collection: 'chatMessages'
    }
);

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
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model("ChatMessages", chatMessageSchema)
