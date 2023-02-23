const db = require('../db')
const Exhibition = require('../classes/Exhibition')
const ErrorHandler = require('../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetExhibitions()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const exhibitions = result[0].map(element => new Exhibition().fromRowData(element))
        res.format({
            'application/json': () => {

                res.json(exhibitions.map(exhibition => exhibition.toJSON()))
            },
            'application/xml': () => {
                res.type('application/xml')
                let xmlData = '<Exhibitions>'
                exhibitions.forEach(exhibition => xmlData += exhibition.toXML())
                res.send(xmlData + '</Exhibitions>')
            },
            'text/html': () => {
                res.render('exhibitionsView', { active: { Exhibitions: true }, data: exhibitions.map(exhibition => exhibition.getDisplay()) })
            }
        })
    })
}