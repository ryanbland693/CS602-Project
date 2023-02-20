const db = require('../../../db')

module.exports = async (req, res, next) => {
    console.log(req.params.id)
    db.query('CALL DeleteExhibition(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/exhibitions')
    })
}