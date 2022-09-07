const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const chatRoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        roomName: {
            type: String,
            required: true
        },
    },
    {
        timestamps: false,
        collection: "chatrooms",
    }
);

chatRoomSchema.statics.createRoom = async function (roomName) {
    try {
        const availableRoom = await this.findOne({
            roomName
        });
        if (availableRoom) {
            return {
                message: 'retrieving an old Chat room',
                chatRoomId: availableRoom._doc._id,
            }
        }

        const newRoom = await this.create({ roomName })
        return {
            message: ' starting new chat room',
            chatRoomId: newRoom._doc._id,
        }
    } catch (error) {
        console.log('error on start method', error);
        throw error

    }
}

module.exports = mongoose.model("ChatRoom", chatRoomSchema)
