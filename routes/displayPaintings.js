const db = require('../db');
const Painting = require('../Painting');

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintings()', (error, result, fields) => {
        if (error) throw error;
        const paintings = result[0].map(element => new Painting().fromRowData(element))
        paintings.forEach((element, index) => element.Odd = index % 2 === 1)
        res.render('paintingsView', { active: { Paintings: true }, data: paintings })
    })
    
}