const db = require("../../../db")

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
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/galleries')
    })

}