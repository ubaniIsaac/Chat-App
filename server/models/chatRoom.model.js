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
<<<<<<< HEAD
    },
    {
        timestamps: false,
=======
        chatInitiator: String,
    },
    {
        timestamps: true,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
        collection: "chatrooms",
    }
);

<<<<<<< HEAD
chatRoomSchema.statics.createRoom = async function (roomName) {
=======
chatRoomSchema.statics.createRoom = async function (
    roomName, chatInitiator
) {
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    try {
        const availableRoom = await this.findOne({
            roomName
        });
        if (availableRoom) {
            return {
<<<<<<< HEAD
=======
                isNew: false,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
                message: 'retrieving an old Chat room',
                chatRoomId: availableRoom._doc._id,
            }
        }

<<<<<<< HEAD
        const newRoom = await this.create({ roomName })
        return {
=======
        const newRoom = await this.create({ roomName, chatInitiator })
        return {
            isNew: true,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
            message: ' starting new chat room',
            chatRoomId: newRoom._doc._id,
        }
    } catch (error) {
        console.log('error on start method', error);
        throw error

    }
}

module.exports = mongoose.model("ChatRoom", chatRoomSchema)
