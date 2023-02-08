const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const displayPaintings = require('./displayPaintings')
const adminPaintings = require('./adminPaintings')
const addPaintingForm = require('./addPaintingForm')
const addPainting = require('./addPainting')
const displayPaintingDetails = require('./displayPaintingDetails')
const confirmDeletePainting = require('./confirmDeletePainting')
const deletePainting = require('./deletePainting')
const editPainting = require('./editPainting')
const updatePainting = require('./updatePainting')

router.get('/', (req, res, next) => {
    res.render('homeView', { active: { Home: true } })
})

router.get('/admin', (req, res, next) => {
    res.redirect('/admin/paintings')
})

router.get('/admin/paintings', adminPaintings)

router.get('/admin/paintings/add', addPaintingForm)

router.post('/admin/paintings/add', upload.single('uploadImage'), addPainting)

router.get('/paintings', displayPaintings)

router.get('/paintings/:id', displayPaintingDetails)

router.get('/admin/paintings/delete/:id', confirmDeletePainting)

router.post('/admin/paintings/delete/:id', deletePainting)

router.get('/admin/paintings/edit/:id', editPainting)

router.post('/admin/paintings/edit/:id', upload.single('uploadImage'), updatePainting)

module.exports = router;