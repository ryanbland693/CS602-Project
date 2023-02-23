const db = require('../../../db')

module.exports = async (req, res, next) => {
    const params = [
        req.file.buffer.toString('base64'),
        req.file.mimetype,
        req.body.paintingName,
        req.body.paintingDescription,
        req.body.paintingPrice ? parseInt(req.body.paintingPrice) : null,
        parseInt(req.body.paintingLength),
        parseInt(req.body.paintingWidth),
        req.body.paintingMedium,
        req.body.paintingAvailability
    ]
    db.query('CALL AddPainting(?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/paintings')
    })

}