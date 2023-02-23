const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    const params = [
        req.body.exhibitionDate,
        req.body.exhibitionName,
        req.body.exhibitionUrl
    ]
    db.query('CALL AddExhibition(?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        res.redirect('/admin/exhibitions')
    })
}