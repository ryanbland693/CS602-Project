const db = require('../../../db');
const Painting = require('../../../classes/Painting');
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintings();', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        
        const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = true))
        res.render('adminPaintingsView',
            { active: { Admin: true }, data: paintings })
    })

}