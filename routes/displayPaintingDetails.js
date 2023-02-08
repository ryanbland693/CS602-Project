const db = require('../db')

const Painting = require('../Painting')

module.exports = async (req, res, next) => {
    db.query('CALL GetPaintingByID(?)', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        if (result[0].length === 0) return res.render('404')
        const data = new Painting().fromRowData(result[0][0])
        res.render('paintingDetailView',
            {
                active: { Paintings: true },
                data,
                processed:
                {
                    dimensions: data.getDimensions(),
                    price: data.getPrice(),
                    imageUrl: data.getImage(),
                    price: data.getPrice()
                }
            })



    })
}