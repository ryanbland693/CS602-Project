const db = require("../../../db")
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    const params = [req.file.buffer.toString('base64'),
    req.file.mimetype,
    req.body.galleryName,
    req.body.galleryCity,
    req.body.galleryCountry,
    req.body.galleryUrl
    ]
    db.query('CALL AddGallery(?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/galleries')
    })

}