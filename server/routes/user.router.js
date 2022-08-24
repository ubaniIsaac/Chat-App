const { check } = require('express-validator')
// const { authorization, checkisAdmin, checkisManager, checkisStaff } = require('../../middlewares/auth')
const userRouter = require('express').Router();

const userController = require("../controllers/user.controller")
module.exports = app => {



    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ], userController.signup);

    userRouter.post('/signin', userController.login);

    // userRouter.get('/logout', authorization, (req, res) => {
    //     res.removeHeader('x-authorization')
    //     return res.redirect('/');
    // });

    app.use('/', userRouter)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}
