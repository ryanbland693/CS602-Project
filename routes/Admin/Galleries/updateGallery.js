const db = require("../../../db");
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    const params = [
        req.params.id,
        req.file !== undefined ? req.file.buffer.toString('base64') : null,
        req.file !== undefined ? req.file.mimetype : null,
        req.body.galleryName,
        req.body.galleryCity,
        req.body.galleryCountry,
        req.body.galleryUrl
    ]
    db.query('CALL EditGallery(?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/galleries')
    })
}