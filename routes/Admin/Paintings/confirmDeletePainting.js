const db = require('../../../db')
const Painting = require('../../../classes/Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        if (result[0].length === 0) {
            const error = new Error('Page not found')
            error.status = 404
            next(error)
            return
        }
        const painting = new Painting().fromRowData(result[0][0]).getDisplay()
        res.render('confirmDeletePainting', { active: { Admin: true }, painting })
    })
}