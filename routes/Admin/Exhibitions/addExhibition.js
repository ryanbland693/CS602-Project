const db = require('../../../db')

module.exports = async (req, res, next) => {
    const params = [
        req.body.exhibitionDate,
        req.body.exhibitionName,
        req.body.exhibitionUrl
    ]
    db.query('CALL AddExhibition(?, ?, ?)', params, (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        res.redirect('/admin/exhibitions')
    })
}