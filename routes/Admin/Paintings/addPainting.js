const db = require('../../../db')

module.exports = async (req, res, next) => {
    const params = [
        req.file.buffer.toString('base64'),
        req.file.mimetype,
        req.body.paintingName,
        req.body.paintingDescription,
        parseInt(req.body.paintingPrice),
        parseInt(req.body.paintingLength),
        parseInt(req.body.paintingWidth),
        req.body.paintingMedium,
        req.body.paintingAvailability
    ]
    db.query('CALL AddPainting(?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        res.redirect('/admin/paintings')
    })

}