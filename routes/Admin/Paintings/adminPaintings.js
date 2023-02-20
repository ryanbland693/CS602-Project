const db = require('../../../db');
const Painting = require('../../../classes/Painting');

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintings();', (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = true))
        res.render('adminPaintingsView',
            { active: { Admin: true }, data: paintings })
    })

}