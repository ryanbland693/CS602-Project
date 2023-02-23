const db = require("../../../db");

module.exports = async (req, res, next) => {
    const params = [
        req.params.id,
        req.file !== undefined ? req.file.buffer.toString('base64') : null,
        req.file !== undefined ? req.file.mimetype : null,
        req.body.paintingName,
        req.body.paintingDescription,
        req.body.paintingPrice ? parseInt(req.body.paintingPrice) : null,
        parseInt(req.body.paintingLength),
        parseInt(req.body.paintingWidth),
        req.body.paintingMedium,
        req.body.paintingAvailability
    ]
    db.query('CALL EditPainting(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/paintings')
    })
}