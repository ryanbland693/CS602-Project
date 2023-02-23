const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const mediumsOptions = result[0].map(element => element.MediumName)
        const availabilitiesOptions = result[2].map(element => element.AvailabilityName)
        res.render('addPaintingView',
            {
                active: { Admin: true },
                data: {
                    mediums: mediumsOptions,
                    availabilities: availabilitiesOptions
                }
            })
    })

}

