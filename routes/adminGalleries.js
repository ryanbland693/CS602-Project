const db = require('../db')
const Gallery = require('../Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) throw err;
        const galleries = result[0].map(element => new Gallery().fromRowData(element))
        galleries.forEach(gallery => gallery.ImageUrl = gallery.getImage())
        res.render('adminGalleriesView',
            { active: { Admin: true }, data: galleries })
    })
}