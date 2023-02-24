const db = require('../db');
const Painting = require('../classes/Painting');
const ErrorHandler = require('../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    params = [
        req.query.medium || null,
        req.query.availability || null,
        req.query.search || null
    ]
    db.query((Object.keys(req.query).length === 0 ? 'CALL GetPaintings();' : 'CALL SearchPaintings(?, ?, ?);'), params, (err, result, fields) => {
        if (err) {
            console.log(err)
            return next(new ErrorHandler(500).getError())
        }
        const paintings = result[0].map(element => new Painting().fromRowData(element))
        res.format({
            'application/json': () => {

                res.json(paintings.map(painting => painting.toJSON()))
            },
            'application/xml': () => {
                res.type('application/xml')
                let xmlData = '<Paintings>'
                paintings.forEach(painting => xmlData += painting.toXML())
                res.send(xmlData + '</Paintings>')
            },
            'text/html': () => {

                db.query('CALL GetFormEnumerations();', (err, result, fields) => {
                    if (err) {
                        return next(new ErrorHandler(500).getError())
                    }
                    const mediumsOptions = result[0].filter(element => element.ItemType == 'Medium').map(element => ({ MediumName: element.ItemName, selected: element.ItemName === params[0] }))
                    const availabilitiesOptions = result[0].filter(element => element.ItemType == 'Availability').map(element => ({ AvailabilityName: element.ItemName, selected: element.ItemName === params[1] }))
                    const paintingData = paintings.map(painting => painting.getDisplay(form = false))
                    paintingData.forEach((painting, index) => painting.Odd = index % 2 === 1)
                    res.render('paintingsView',
                        {
                            active: { Paintings: true },
                            data: paintingData,
                            options: { mediums: mediumsOptions, availabilities: availabilitiesOptions }, searchText: req.query.search
                        })
                })

            }
        })
    })

}