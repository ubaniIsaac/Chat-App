const { check } = require('express-validator')
const userRouter = require('express').Router();
const bodyParser = require('body-parser')


const userController = require("../controllers/user.controller")
module.exports = app => {
    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ], userController.signup);

    userRouter.post('/', userController.login);

    userRouter.get('/logout', (req, res) => {
        res.removeHeader('x-authorization')
        if (err) return res.status(400).send(err);
    });


    app.use('/', userRouter)
    app.use((err, req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
    })
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}
