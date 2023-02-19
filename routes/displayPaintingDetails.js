const db = require('../db')

const Painting = require('../classes/Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingByID(?)', [req.params.id], (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        if (result[0].length === 0) return res.render('error', { status: 404, message: 'Page not found', details: 'We can\t find this painting' })
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
                console.log(paintingDisplay)
                res.render('paintingDetailView', { active: { Paintings: true }, paintingDisplay })
            }
        })
        // res.render('paintingDetailView', { active: { Paintings: true }, data })



    })
}