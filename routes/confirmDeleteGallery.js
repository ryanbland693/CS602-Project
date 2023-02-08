const db = require('../db')
const Gallery = require('../Gallery')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleryByID(?)', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        if (result[0].length === 0) return res.render('404')
        const gallery = new Gallery().fromRowData(result[0][0])
        gallery.ImageUrl = gallery.getImage();
        res.render('confirmDeleteGalleryView', {active : {Admin : true}, gallery})
        //console.log(gallery);
    })
    
}