const db = require('../db')
const Exhibition = require('../classes/Exhibition')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitions()', (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        const exhibitions = result[0].map(element => new Exhibition().fromRowData(element))
        res.format({
            'application/json': () => {

                res.json(exhibitions.map(exhibition => exhibition.toJSON()))
            },
            'application/xml': () => {
                res.type('application/xml')
                let xmlData = '<Results>'
                exhibitions.forEach(exhibition => xmlData += exhibition.toXML())
                res.send(xmlData + '</Results>')
            },
            'text/html': () => {
                res.render('exhibitionsView', { active: { Exhibitions: true }, data: exhibitions.map(exhibition => exhibition.getDisplay()) })
            }
        })
    })
}