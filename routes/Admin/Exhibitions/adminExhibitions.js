const db = require('../../../db')
const Exhibition = require('../../../classes/Exhibition')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitions()', (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        const exhibitions = result[0].map(element => new Exhibition().fromRowData(element))
        exhibitions.forEach(element => element.FormattedDate = element.formatDate())
        res.render('adminExhibitionsView', { active: { Admin: true }, data: exhibitions })
    })
}