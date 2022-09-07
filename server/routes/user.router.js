const { check } = require('express-validator')
<<<<<<< HEAD
const userRouter = require('express').Router();
const bodyParser = require('body-parser')


const userController = require("../controllers/user.controller")
module.exports = app => {
=======
// const { authorization, checkisAdmin, checkisManager, checkisStaff } = require('../../middlewares/auth')
const userRouter = require('express').Router();

const userController = require("../controllers/user.controller")
module.exports = app => {



>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ], userController.signup);

<<<<<<< HEAD
    userRouter.post('/', userController.login);


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
=======
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
>>>>>>> 42da6163205bb56d53ea51ce14af1038ab8748c1
}
