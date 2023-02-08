const db = require('../db')
const Painting = require('../Painting')

module.exports = async (req, res, next) => {
    //console.log(req.params.id)
    db.query('CALL GetPaintingById(?)', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        if (result[0].length === 0) return res.render('404')
        const painting = new Painting().fromRowData(result[0][0])
        painting.ImageUrl = painting.getImage();
        res.render('confirmDeletePainting', {active : {Admin : true}, painting})
    })
}