const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    console.log(req.params.id)
    db.query('CALL DeleteExhibition(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/exhibitions')
    })
}