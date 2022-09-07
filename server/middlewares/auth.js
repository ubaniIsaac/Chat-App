const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET_KEY } = process.env

exports.authorization = async (req, res, next) => {
    const token = await req.query.token || req.header("x-access-token") || req.header("x-authorization")
    try {
        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "No token Unauthorized"
            })
        }

        const decoded = await jwt.verify(token, SECRET_KEY)
        req.user = decoded.user

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }

    return next()
}
