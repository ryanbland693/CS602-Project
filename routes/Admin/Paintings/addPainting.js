const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    const params = [
        req.file.buffer.toString('base64'),
        req.file.mimetype,
        req.body.paintingName,
        req.body.paintingDescription,
        req.body.paintingPrice ? parseInt(req.body.paintingPrice) : null,
        parseInt(req.body.paintingLength),
        parseInt(req.body.paintingWidth),
        req.body.paintingVisible === 'true',
        req.body.paintingMedium,
        req.body.paintingAvailability
    ]
    db.query('CALL AddPainting(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/paintings')
    })

}