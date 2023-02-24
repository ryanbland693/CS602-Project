const db = require('../../../db')
const ErrorHandler = require('../../../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetFormEnumerations();', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const mediumsOptions = result[0].filter(element => element.ItemType == 'Medium').map(element => element.ItemName)
        const availabilitiesOptions = result[0].filter(element => element.ItemType == 'Availability').map(element => element.ItemName)
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

