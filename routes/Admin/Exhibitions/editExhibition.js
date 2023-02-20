const db = require('../../../db')
const Exhibition = require('../../../classes/Exhibition')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitionById(?)', [req.params.id], (err, result, fields) => {
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
        const data = new Exhibition().fromRowData(result[0][0]).getDisplay(form = true)
        res.render('editExhibitionView', { active: { Admin: true }, data })
    })
}