const db = require('../../../db');
const Painting = require('../../../classes/Painting');

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintings();', (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = true))
        res.render('adminPaintingsView',
            { active: { Admin: true }, data: paintings })
    })

}