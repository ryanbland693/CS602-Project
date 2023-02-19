const db = require('../db');
const Painting = require('../classes/Painting');

module.exports = async (req, res, next) => {
    params = [
        req.query.medium || null,
        req.query.availability || null,
        req.query.search || null
    ]
    db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
        if (err) throw err;
        const mediumsOptions = result[0].map(element => ({ MediumName: element.MediumName, selected: element.MediumName === params[0] }))
        const availabilitiesOptions = result[2].map(element => ({ AvailabilityName: element.AvailabilityName, selected: element.AvailabilityName === params[1] }))
        availabilitiesOptions.forEach(availability => availability.selected = availability.AvailabilityName === params[1])
        db.query(Object.keys(req.query).length === 0 ? 'CALL GetPaintings()' : 'CALL SearchPaintings(?, ?, ?)', params, (err, result, fields) => {
            if (err) throw err;
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
                    const paintingData = paintings.map(painting => painting.getDisplay(form=false))
                    paintingData.forEach((painting, index) => painting.Odd = index % 2 === 1)
                    res.render('paintingsView',
                        {
                            active: { Paintings: true },
                            data: paintingData, 
                            options: { mediums: mediumsOptions, availabilities: availabilitiesOptions }, searchText: req.query.search
                        })
                }
            })
            // const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = false))
            // paintings.forEach((element, index) => element.Odd = index % 2 === 1)
            //res.render('paintingsView', { active: { Paintings: true }, data: paintings, options: { mediums: mediumsOptions, availabilities: availabilitiesOptions }, searchText: req.query.search })
        })
    })
}


// module.exports = async (req, res, next) => {
//     if (Object.keys(req.query).length === 0) {
//         db.query('CALL GetPaintings()', (err, result, fields) => {
//             if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
//             const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = false))
//             paintings.forEach((element, index) => element.Odd = index % 2 === 1)
//             db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
//                 //console.log(result[0])
//                 const mediumsOptions = result[0].map(element => element.MediumName)
//                 const availabilitiesOptions = result[2].map(element => element.AvailabilityName)
//                 res.render('paintingsView', { active: { Paintings: true }, data: paintings, options: { mediums: mediumsOptions, availabilities: availabilitiesOptions } })
//             })
//         })
//     } else {
//         params = [
//             req.query.medium || null,
//             req.query.availability || null,
//             req.query.search || null
//         ]
//         db.query('CALL GetMediums(); CALL GetAvailabilities()', (err, result, fields) => {
//             //console.log(result[0])
//             const mediumsOptions = result[0].map(element => element.MediumName)
//             const availabilitiesOptions = result[2].map(element => element.AvailabilityName)
//             db.query('CALL SearchPaintings(?, ?, ?)', params, (err, result, fields) => {
//                 if (err) throw err;
//                 const paintings = result[0].map(element => new Painting().fromRowData(element).getDisplay(form = false))
//                 paintings.forEach((element, index) => element.Odd = index % 2 === 1)
//                 res.render('paintingsView', { active: { Paintings: true }, data: paintings, options: { mediums: mediumsOptions, availabilities: availabilitiesOptions } })
//             })
//             //res.render('paintingsView', { active: { Paintings: true }, options: { mediums: mediumsOptions, availabilities: availabilitiesOptions } })
//         })
//     }
// }