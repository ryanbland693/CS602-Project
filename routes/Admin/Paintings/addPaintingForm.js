const db = require('../../../db')

module.exports = async (req, res, next) => {
    db.query('CALL GetMediums(); CALL GetAvailabilities', (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
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

