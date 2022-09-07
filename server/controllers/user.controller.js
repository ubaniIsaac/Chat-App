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
<<<<<<< HEAD
            return res.status(400).send({ err: "Content cannot be empty" })
=======
            return res.status(400).json({ err: "Content cannot be empty" })
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
        }

        const existingUser = await usermodel.findOne({ email: email })
        if (existingUser) {
<<<<<<< HEAD
            return res.status(400).send({
=======
            return res.status(400).json({
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
                error: "Email already in use"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.signup(email, userName, hashPassword);
        if (!user) {
<<<<<<< HEAD
            return res.status(500).send({
=======
            return res.status(500).json({
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
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
<<<<<<< HEAD
        return res.status(400).send({ error: errors.array() })
    }

    try {
        if (!(userName && password)) {
            return res.status(400).send("All inputs required");
=======
        return res.status(400).json({ error: errors.array() })
    }

    try {
        if (!(email && password)) {
            res.status(400).send("All inputs required");
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
        }
        const user = await usermodel.login(userName, password)
        if (!user || !(await bcrypt.compare(password, user.password))) {

<<<<<<< HEAD
            res.status(400).send({
                statusCode: 400,
                message: "Invalid Credentials"
            });
            console.log('Invalid credentials')
=======
            res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials"
            });
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1

        } else {

            const payload = {
                user: {
                    id: user.id,
                    userName: user.userName
                }
            }
            jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
                if (err) throw err
<<<<<<< HEAD
                res.status(200).send({
=======
                res.json({
                    statusCode: 200,
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
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
