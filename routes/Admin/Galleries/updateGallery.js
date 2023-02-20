const db = require("../../../db");

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
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/galleries')
    })
}