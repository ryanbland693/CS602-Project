const db = require('../db');
const Gallery = require('../classes/Gallery');

module.exports = async (req, res, next) => {
    db.query('CALL GetGalleries()', (err, result, fields) => {
        if (err) return res.render('error', { status: 500, message: 'Server error', details: 'Something went wrong' })
        const galleries = result[0].map(element => new Gallery().fromRowData(element));
        res.format({
            'application/json' : () => {
                res.json(galleries.map(gallery => gallery.toJSON()))
            },
            'application/xml' : () => {
                res.type('application/xml')
                let xmlData = '<Results>'
                galleries.forEach(gallery => xmlData += gallery.toXML())
                res.send(xmlData + '</Results>')
            },
            'text/html' : () => {
                res.render('galleriesView', { active: { Galleries: true }, data: galleries.map(gallery => gallery.getDisplay()) })
            }
        })
        //res.render('galleriesView', { active: { Galleries: true }, data: galleries })
    })
}