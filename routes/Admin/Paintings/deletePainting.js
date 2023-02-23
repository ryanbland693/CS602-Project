const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL DeletePaintingById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/paintings')
    })
}