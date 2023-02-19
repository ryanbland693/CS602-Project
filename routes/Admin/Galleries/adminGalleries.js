const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        const galleries = result[0].map(element => new Gallery().fromRowData(element).getDisplay())
        res.render('adminGalleriesView',
            { active: { Admin: true }, data: galleries })
    })
}