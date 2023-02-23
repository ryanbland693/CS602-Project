const db = require("../../../db");
const ErrorHandler = require('../../../classes/ErrorHandler')

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
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/paintings')
    })
}