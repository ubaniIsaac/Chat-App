const multer = require('multer')
const express = require('express')
const { handleDownload, uploadFile } = require('../controllers/files.controller')

const upload = multer({ dest: "uploads/" })


const filesRouter = express.Router();


module.exports = app => {

    filesRouter.post('/upload', upload.single('file'), uploadFile)
    filesRouter.get("/file/:id", handleDownload)
    filesRouter.post("/file/:id", handleDownload)

    app.use('/', filesRouter)
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}