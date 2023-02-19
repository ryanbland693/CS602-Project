const DatabaseResult = require('./DatabaseResult')

module.exports = class Gallery extends DatabaseResult {
    constructor(GalleryId = undefined, GalleryImage = undefined,
        GalleryMimetype = undefined, GalleryName = undefined,
        GalleryCity = undefined, GalleryCountry = undefined,
        GalleryURL = undefined) {
        super(DatabaseResult);
        this.GalleryId = GalleryId
        this.GalleryImage = GalleryImage
        this.GalleryMimetype = GalleryMimetype
        this.GalleryName = GalleryName
        this.GalleryCity = GalleryCity
        this.GalleryCountry = GalleryCountry
        this.GalleryURL = GalleryURL
    }

    getImage() {
        return `data:${this.GalleryMimetype};base64,${this.GalleryImage}`
    }

    getDisplay() {
        return {
            GalleryId: this.GalleryId,
            ImageUrl: this.getImage(),
            GalleryName: this.GalleryName,
            GalleryCity: this.GalleryCity,
            GalleryCountry: this.GalleryCountry,
            GalleryURL: this.GalleryURL
        }
    }
}