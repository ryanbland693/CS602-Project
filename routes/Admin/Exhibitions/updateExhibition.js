const db = require('../../../db')

module.exports = async (req, res, next) => {
    params = [
        req.params.id,
        req.body.exhibitionDate,
        req.body.exhibitionName,
        req.body.exhibitionUrl
    ]
    db.query('CALL EditExhibition(?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        res.redirect('/admin/exhibitions')
    })
}