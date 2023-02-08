module.exports = async (req, res, next) => {
    res.render('addGalleryView', { active: { Admin: true } })
}