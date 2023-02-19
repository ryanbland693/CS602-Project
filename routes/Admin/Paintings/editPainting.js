const db = require('../../../db')
const Painting = require('../../../classes/Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?);CALL GetMediums(); CALL GetAvailabilities', [req.params.id], (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        if (result.length !== 6) return res.render('error', { status: 404, message: 'Page not found', details: 'We can\'t find this painting' })
        const data = new Painting().fromRowData(result[0][0]).getDisplay(form = true)
        const mediums = result[2].map(element => ({ Medium: element.MediumName, selected: element.MediumName === data.MediumName }))
        const availabilities = result[4].map(element => ({ Availability: element.AvailabilityName, selected: element.AvailabilityName === data.AvailabilityName }))
        res.render('editPaintingView', { active: { Admin: true }, data, mediums, availabilities })
    })

}