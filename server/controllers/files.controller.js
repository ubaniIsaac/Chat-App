const filesModel = require('../models/file.model')

exports.uploadFile = async (req, res) => {
    try {
        const fileData = {
            path: req.file.path,
            originalName: req.file.originalname,
        }
        const { sender } = req.body
        const file = await filesModel.create(fileData, sender)
        res.status(200).send({ fileLink: `${req.headers.origin}/file/${file.id}` })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }

}

exports.handleDownload = async (req, res) => {
    try {
        const file = await File.findById(req.params.id)

        file.downloadCount++
        await file.save()
        console.log(file.downloadCount)

        res.download(file.path, file.originalName)
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }

}