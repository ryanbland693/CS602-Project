const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleryByID(?)', [req.params.id], (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        if (result[0].length === 0) return res.render('error', { status: 404, message: 'Page not found', details: 'We can\'t find this gallery' })
        const data = new Gallery().fromRowData(result[0][0]).getDisplay()
        res.render('editGalleryView', { active: { Admin: true }, data })
    })
}