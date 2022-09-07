const express = require('express')
const { authorization } = require('../middlewares/auth')
const { getAllMessages, postMessage } = require('../controllers/messages.controller')

const messagesRouter = express.Router();


module.exports = app => {

    messagesRouter.post('/:chatRoom', authorization, postMessage)
    messagesRouter.get('/:chatRoom', authorization, getAllMessages)

    app.use('/', messagesRouter)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}