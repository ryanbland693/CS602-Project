const db = require('../../../db')
const Exhibition = require('../../../classes/Exhibition')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitionById(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result[0].length === 0) {
            return next(new ErrorHandler(404).getError())
        }
        const data = new Exhibition().fromRowData(result[0][0]).getDisplay(form = true)
        res.render('editExhibitionView', { active: { Admin: true }, data })
    })
}