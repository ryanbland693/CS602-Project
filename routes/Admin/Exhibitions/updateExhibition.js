const db = require('../../../db')

module.exports = async (req, res, next) => {
    params = [
        req.params.id,
        req.body.exhibitionDate,
        req.body.exhibitionName,
        req.body.exhibitionUrl
    ]
    db.query('CALL EditExhibition(?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        res.redirect('/admin/exhibitions')
    })
}