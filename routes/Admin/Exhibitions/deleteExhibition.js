const db = require('../../../db')

module.exports = async (req, res, next) => {
    console.log(req.params.id)
    db.query('CALL DeleteExhibition(?)', [req.params.id], (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        res.redirect('/admin/exhibitions')
    })
}