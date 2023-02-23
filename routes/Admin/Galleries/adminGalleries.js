const db = require('../../../db')
const Gallery = require('../../../classes/Gallery')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const galleries = result[0].map(element => new Gallery().fromRowData(element).getDisplay())
        res.render('adminGalleriesView',
            { active: { Admin: true }, data: galleries })
    })
}