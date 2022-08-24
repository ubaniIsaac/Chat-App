const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },

    },
    {
        collection: 'users'
    })

UserSchema.statics.signup = async function (
    email, userName, password
) {
    try {
        const user = await this.create({ email, userName, password })
        return user
    } catch (error) {
        throw error
    }
}

UserSchema.statics.login = async function (
    userName,
    password,
) {
    try {
        const user = await this.findOne({
            userName
        });
        return user;
    } catch (error) {
        throw error;
    }
}



module.exports = mongoose.model("User", UserSchema)
