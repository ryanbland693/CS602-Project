const db = require('../../../db')

module.exports = async (req, res, next) => {
    const params = [
        req.body.exhibitionDate,
        req.body.exhibitionName,
        req.body.exhibitionUrl
    ]
    db.query('CALL AddExhibition(?, ?, ?)', params, (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500;
            next(err)
        }
        res.redirect('/admin/exhibitions')
    })
}