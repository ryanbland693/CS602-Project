const db = require('../../../db')
const Painting = require('../../../classes/Painting')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?);CALL GetMediums(); CALL GetAvailabilities', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result.length !== 6) {
            return next(new ErrorHandler(404).getError())
        }
        const data = new Painting().fromRowData(result[0][0]).getDisplay(form = true)
        const mediums = result[2].map(element => ({ Medium: element.MediumName, selected: element.MediumName === data.MediumName }))
        const availabilities = result[4].map(element => ({ Availability: element.AvailabilityName, selected: element.AvailabilityName === data.AvailabilityName }))
        res.render('editPaintingView', { active: { Admin: true }, data, mediums, availabilities })
    })

}