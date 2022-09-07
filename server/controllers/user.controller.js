const usermodel = require('../models/user.model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env




exports.signup = async (req, res) => {
    try {

        const { email, userName, password } = req.body;
        if (!email || !userName || !password) {
            return res.status(400).send({ err: "Content cannot be empty" })
        }

        const existingUser = await usermodel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).send({
                error: "Email already in use"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.signup(email, userName, hashPassword);
        if (!user) {
            return res.status(500).send({
                error: "Some error occured"
            })
        }
        else {
            return res.json({ status: "success", data: user })
        }

    } catch (error) {
        throw error
    }

}

exports.login = async (req, res) => {
    const { userName, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() })
    }

    try {
        if (!(userName && password)) {
            return res.status(400).send("All inputs required");
        }
        const user = await usermodel.login(userName, password)
        if (!user || !(await bcrypt.compare(password, user.password))) {

            res.status(400).send({
                statusCode: 400,
                message: "Invalid Credentials"
            });
            console.log('Invalid credentials')

        } else {

            const payload = {
                user: {
                    id: user.id,
                    userName: user.userName
                }
            }
            jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
                if (err) throw err
                res.status(200).send({
                    message: "Logged in Successfully",
                    user: {
                        userName: user.userName,
                        email: user.email,
                    },
                    token
                })
            })
        }

    } catch (error) {
        throw error
    }
}