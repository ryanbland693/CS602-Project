const db = require('../../../db')
const Exhibition = require('../../../classes/Exhibition')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitionById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result[0].length === 0) return res.render('error', { status: 404, message: 'Page not found', details: 'We can\'t find this exhibition' })
        const exhibition = new Exhibition().fromRowData(result[0][0]).getDisplay();
        res.render('confirmDeleteExhibition', { active: { Admin: true }, exhibition })
    })
}