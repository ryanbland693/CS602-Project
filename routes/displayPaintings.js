const db = require('../db');
const Painting = require('../classes/Painting');
const ErrorHandler = require('../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    params = [
        req.query.medium || null,
        req.query.availability || null,
        req.query.search || null
    ]
    db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const mediumsOptions = result[0].map(element => ({ MediumName: element.MediumName, selected: element.MediumName === params[0] }))
        const availabilitiesOptions = result[2].map(element => ({ AvailabilityName: element.AvailabilityName, selected: element.AvailabilityName === params[1] }))
        availabilitiesOptions.forEach(availability => availability.selected = availability.AvailabilityName === params[1])
        db.query(Object.keys(req.query).length === 0 ? 'CALL GetPaintings()' : 'CALL SearchPaintings(?, ?, ?)', params, (err, result, fields) => {
            if (err) {
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
                    const paintingData = paintings.map(painting => painting.getDisplay(form = false))
                    paintingData.forEach((painting, index) => painting.Odd = index % 2 === 1)
                    res.render('paintingsView',
                        {
                            active: { Paintings: true },
                            data: paintingData,
                            options: { mediums: mediumsOptions, availabilities: availabilitiesOptions }, searchText: req.query.search
                        })
                }
            })
        })
    })
}