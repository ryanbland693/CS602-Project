const fs = require('fs');
const path = require('path')
const mime = require('mime-types')
const paintings = require('./prefillData/paintings/paintings')
const galleries = require('./prefillData/galleries/galleries')
const exhibitions = require('./prefillData/exhibitions/exhibitions')

const db = require('./db');
const con = require('./db');

console.log('Adding Paintings...')
paintings.forEach(painting => {
    fs.readFile(path.join(__dirname, '/prefillData/paintings/', painting.PaintingFile), (err, buffer) => {
        if (err) throw err;
        db.query('CALL AddPainting(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [buffer.toString('base64'), mime.lookup(painting.PaintingFile), painting.PaintingName, painting.PaintingDescription, 
                painting.PaintingPrice, painting.PaintingLength, painting.PaintingWidth, painting.MediumName, painting.AvailabilityName], (err, result, fields) => {
                if (err) throw err;
            })
    })
})
console.log('Added Paintings')

console.log('Adding Galleries...')
galleries.forEach(gallery => {
    fs.readFile(path.join(__dirname, '/prefillData/galleries/', gallery.GalleryFile), (err, buffer) => {
        if (err) throw err;
        db.query('CALL AddGallery(?, ?, ?, ?, ?, ?)',
            [buffer.toString('base64'), mime.lookup(gallery.GalleryFile), gallery.GalleryName,
                gallery.GalleryCity, gallery.GalleryCountry, gallery.GalleryUrl],
            (err, result, fields) => {
                if (err) throw err;
            })
    })
})
console.log('Galleries Added')

console.log('Adding Exhibitions...')
exhibitions.forEach(exhibition => {
    db.query('CALL AddExhibition(?, ?, ?)', [exhibition.ExhibitionDate, exhibition.ExhibitonName, exhibition.ExhibitionUrl], (err, result, fields) => {
        if (err) throw err;
    })
})
console.log('Exhibitions Added')
