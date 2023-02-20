const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleryByID(?)', [req.params.id], (err, result, fields) => {
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
        const data = new Gallery().fromRowData(result[0][0]).getDisplay()
        res.render('editGalleryView', { active: { Admin: true }, data })
    })
}