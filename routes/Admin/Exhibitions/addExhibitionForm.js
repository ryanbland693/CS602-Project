module.exports = async (req, res, next) => {
    res.render('addExhibitionView', { active: { Admin: true } })
}