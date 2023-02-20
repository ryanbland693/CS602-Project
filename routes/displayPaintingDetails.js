const db = require('../db')

const Painting = require('../classes/Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingByID(?)', [req.params.id], (err, result, fields) => {
        if (err) {
            const error = new Error('Server Error')
            error.status = 500
            next(error)
            return
        }
        if (result[0].length === 0) {
            const error = new Error('Page not found')
            error.status = 404
            next(error)
            return
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
        // res.render('paintingDetailView', { active: { Paintings: true }, data })



    })
}