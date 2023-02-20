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
        if (result[0].length === 0) return res.render('error', { status: 404, message: 'Page not found', details: 'We can\'t find this gallery' })
        const gallery = new Gallery().fromRowData(result[0][0]).getDisplay()
        res.render('confirmDeleteGalleryView', { active: { Admin: true }, gallery })
    })

}