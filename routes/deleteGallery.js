const db = require('../db')

module.exports = async (req, res, next) => {
    db.query('CALL DeleteGalleryByID(?)', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        res.redirect('/admin/galleries')
    })
}