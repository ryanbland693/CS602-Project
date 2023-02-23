const db = require('../db')
const Painting = require('../classes/Painting')
const ErrorHandler = require('../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingByID(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        if (result[0].length === 0) {
            return next(new ErrorHandler(404).getError())
        }
        const data = new Painting().fromRowData(result[0][0])
        res.format({
            'application/json' : () => {
                res.json(data.toJSON())
            },
            'application/xml' : () => {
                res.type('application/xml')
                res.send(data.toXML())
            },
            'text/html' : () => {
                const paintingDisplay = data.getDisplay(form = false)
                res.render('paintingDetailView', { active: { Paintings: true }, paintingDisplay })
            }
        })
      


    })
}