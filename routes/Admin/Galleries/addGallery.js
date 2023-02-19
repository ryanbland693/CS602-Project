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
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        res.redirect('/admin/galleries')
    })

}