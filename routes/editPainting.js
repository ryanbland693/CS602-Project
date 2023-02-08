const db = require('../db')
const Painting = require('../Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingById(?);CALL GetMediums(); CALL GetAvailabilities', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        if (result.length !== 6) return res.render('404')
        const data = new Painting().fromRowData(result[0][0])
        const mediums = result[2].map(element => ({Medium : element.MediumName, selected : element.MediumName === data.MediumName}))
        const availabilities = result[4].map(element => ({Availability : element.AvailabilityName, selected : element.AvailabilityName === data.AvailabilityName}))
        data.ImageUrl = data.getImage();
        res.render('editPaintingView', {active : {Admin : true}, data, mediums, availabilities})
    })

}