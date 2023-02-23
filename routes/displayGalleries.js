const db = require('../db');
const Gallery = require('../classes/Gallery');
const ErrorHandler = require('../classes/ErrorHandler')

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) {
            return next(new ErrorHandler(500).getError())
        }
        const galleries = result[0].map(element => new Gallery().fromRowData(element));
        res.format({
            'application/json' : () => {
                res.json(galleries.map(gallery => gallery.toJSON()))
            },
            'application/xml' : () => {
                res.type('application/xml')
                let xmlData = '<Galleries>'
                galleries.forEach(gallery => xmlData += gallery.toXML())
                res.send(xmlData + '</Galleries>')
            },
            'text/html' : () => {
                res.render('galleriesView', { active: { Galleries: true }, data: galleries.map(gallery => gallery.getDisplay()) })
            }
        })
        //res.render('galleriesView', { active: { Galleries: true }, data: galleries })
    })
}