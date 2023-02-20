const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        const galleries = result[0].map(element => new Gallery().fromRowData(element).getDisplay())
        res.render('adminGalleriesView',
            { active: { Admin: true }, data: galleries })
    })
}