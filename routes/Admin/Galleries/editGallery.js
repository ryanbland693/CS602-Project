const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleryByID(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result[0].length === 0) {
            return next(new ErrorHandler(404).getError())
        }
        const data = new Gallery().fromRowData(result[0][0]).getDisplay()
        res.render('editGalleryView', { active: { Admin: true }, data })
    })
}