const db = require('../../../db')
const Exhibition = require('../../../classes/Exhibition')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitions()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const exhibitions = result[0].map(element => new Exhibition().fromRowData(element).getDisplay(form=false))
        console.log(exhibitions[0])
        res.render('adminExhibitionsView', { active: { Admin: true }, data: exhibitions })
    })
}