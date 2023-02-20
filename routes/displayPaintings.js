const db = require('../db');
const Painting = require('../classes/Painting');

module.exports = async (req, res, next) => {
    params = [
        req.query.medium || null,
        req.query.availability || null,
        req.query.search || null
    ]
    db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        const mediumsOptions = result[0].map(element => ({ MediumName: element.MediumName, selected: element.MediumName === params[0] }))
        const availabilitiesOptions = result[2].map(element => ({ AvailabilityName: element.AvailabilityName, selected: element.AvailabilityName === params[1] }))
        availabilitiesOptions.forEach(availability => availability.selected = availability.AvailabilityName === params[1])
        db.query(Object.keys(req.query).length === 0 ? 'CALL GetPaintings()' : 'CALL SearchPaintings(?, ?, ?)', params, (err, result, fields) => {
            if (err) {
                const error = new Error('Server Error')
                error.status = 500
                next(error)
                return
            }
            const paintings = result[0].map(element => new Painting().fromRowData(element))
            res.format({
                'application/json': () => {

                    res.json(paintings.map(painting => painting.toJSON()))
                },
                'application/xml': () => {
                    res.type('application/xml')
                    let xmlData = '<Results>'
                    paintings.forEach(painting => xmlData += painting.toXML())
                    res.send(xmlData + '</Results>')
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