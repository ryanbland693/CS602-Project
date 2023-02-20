const db = require('../../../db')

module.exports = async (req, res, next) => {
    db.query('CALL DeletePaintingById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/paintings')
    })
}