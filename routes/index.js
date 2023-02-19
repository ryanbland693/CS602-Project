const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg') return cb(new Error('Only jpeg images are allowed'))
        cb(null, true)
    }
})

const displayPaintings = require('./displayPaintings')
const displayGalleries = require('./displayGalleries')
const displayExhibitions = require('./displayExhibitions');

const adminPaintings = require('./Admin/Paintings/adminPaintings')
const addPaintingForm = require('./Admin/Paintings/addPaintingForm')
const addPainting = require('./Admin/Paintings/addPainting')
const displayPaintingDetails = require('./displayPaintingDetails')
const confirmDeletePainting = require('./Admin/Paintings/confirmDeletePainting')
const deletePainting = require('./Admin/Paintings/deletePainting')
const editPainting = require('./Admin/Paintings/editPainting')
const updatePainting = require('./Admin/Paintings/updatePainting')

const adminGalleries = require('./Admin/Galleries/adminGalleries')
const addGalleryForm = require('./Admin/Galleries/addGalleryForm')
const addGallery = require('./Admin/Galleries/addGallery')
const confirmDeleteGallery = require('./Admin/Galleries/confirmDeleteGallery')
const deleteGallery = require('./Admin/Galleries/deleteGallery')
const editGallery = require('./Admin/Galleries/editGallery')
const updateGallery = require('./Admin/Galleries/updateGallery')

const adminExhibitions = require('./Admin/Exhibitions/adminExhibitions')
const addExhibitionForm = require('./Admin/Exhibitions/addExhibitionForm')
const addExhibition = require('./Admin/Exhibitions/addExhibition')
const confirmDeleteExhibition = require('./Admin/Exhibitions/confirmDeleteExhibition');
const deleteExhibition = require('./Admin/Exhibitions/deleteExhibition');
const editExhibition = require('./Admin/Exhibitions/editExhibition');
const updateExhibition = require('./Admin/Exhibitions/updateExhibition');


// User Routes
router.get('/', (req, res, next) => {
    res.render('homeView', { active: { Home: true } })
})
router.get('/paintings', displayPaintings)
router.get('/paintings/:id', displayPaintingDetails)
router.get('/galleries', displayGalleries)
router.get('/exhibitions', displayExhibitions)

// Admin Routes

router.get('/admin', (req, res, next) => {
    res.redirect('/admin/paintings')
})

// Admin Paintings
router.get('/admin/paintings', adminPaintings)
router.get('/admin/paintings/add', addPaintingForm)
router.post('/admin/paintings/add', upload.single('uploadImage'), addPainting)
router.get('/admin/paintings/delete/:id', confirmDeletePainting)
router.post('/admin/paintings/delete/:id', deletePainting)
router.get('/admin/paintings/edit/:id', editPainting)
router.post('/admin/paintings/edit/:id', upload.single('uploadImage'), updatePainting)

// Admin Galleries
router.get('/admin/galleries', adminGalleries)
router.get('/admin/galleries/add', addGalleryForm)
router.post('/admin/galleries/add', upload.single('uploadImage'), addGallery)
router.get('/admin/galleries/delete/:id', confirmDeleteGallery)
router.post('/admin/galleries/delete/:id', deleteGallery)
router.get('/admin/galleries/edit/:id', editGallery)
router.post('/admin/galleries/edit/:id', upload.single('uploadImage'), updateGallery)

// Admin Exhibitions
router.get('/admin/exhibitions', adminExhibitions)
router.get('/admin/exhibitions/add', addExhibitionForm)
router.post('/admin/exhibitions/add', addExhibition)
router.get('/admin/exhibitions/delete/:id', confirmDeleteExhibition)
router.post('/admin/exhibitions/delete/:id', deleteExhibition)
router.get('/admin/exhibitions/edit/:id', editExhibition)
router.post('/admin/exhibitions/edit/:id', updateExhibition)

module.exports = router;