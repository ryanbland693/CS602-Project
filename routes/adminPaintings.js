const db = require('../db');
const Painting = require('../Painting');

module.exports = async (req, res, next) => {
    db.query('CALL GetAdminPaintings();', (err, result, fields) => {
        if (err) throw err;
        const paintings = result[0].map(element => new Painting().fromRowData(element))
        paintings.forEach(painting => painting.ImageUrl = painting.getImage())
        res.render('adminPaintingsView',
            { active: { Admin: true }, data: paintings })
    })

}