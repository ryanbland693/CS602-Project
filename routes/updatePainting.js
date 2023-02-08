const db = require("../db");

module.exports = async (req, res, next) =>  {
    const params = [req.params.id,
                    req.file !== undefined ? req.file.buffer.toString('base64') : null,
                    req.file !== undefined ? req.file.mimetype : null,
                    req.body.paintingName,
                    req.body.paintingDescription,
                    parseInt(req.body.paintingPrice),
                    parseInt(req.body.paintingLength),
                    parseInt(req.body.paintingWidth),
                    req.body.paintingMedium,
                    req.body.paintingAvailability
    ]
    db.query('CALL EditPainting(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (err, result, fields) => {
        if (err) throw err;
        console.log(result)
        res.redirect('/admin/paintings')
    })
}