const db = require('../../../db')
const Painting = require('../../../classes/Painting')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?);', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result.length !== 2) {
            return next(new ErrorHandler(404).getError())
        }
        const data = new Painting().fromRowData(result[0][0]).getDisplay(form = true)
        db.query('CALL GetFormEnumerations();', (err, result, fields) => {
            if (err) {
                return next(new ErrorHandler(500).getError())
            }
            const mediums = result[0].filter(element => element.ItemType == 'Medium').map(element => ({ Medium: element.ItemName, selected: element.ItemName === data.MediumName }))
            const availabilities = result[0].filter(element => element.ItemType == 'Availability').map(element => ({ Availability: element.ItemName, selected: element.ItemName === data.AvailabilityName }))
            res.render('editPaintingView', { active: { Admin: true }, data, mediums, availabilities })
        })
    })
}