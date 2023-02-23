const db = require('../../../db')
const Painting = require('../../../classes/Painting')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result[0].length === 0) {
            return next(new ErrorHandler(404).getError())
        }
        const painting = new Painting().fromRowData(result[0][0]).getDisplay()
        res.render('confirmDeletePainting', { active: { Admin: true }, painting })
    })
}