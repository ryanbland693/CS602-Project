module.exports = class Gallery {
    constructor(GalleryId = undefined, GalleryImage = undefined,
        GalleryMimetype = undefined, GalleryName = undefined,
        GalleryCity = undefined, GalleryCountry = undefined,
        GalleryURL = undefined) {
        this.GalleryId = GalleryId
        this.GalleryImage = GalleryImage
        this.GalleryMimetype = GalleryMimetype
        this.GalleryName = GalleryName
        this.GalleryCity = GalleryCity
        this.GalleryCountry = GalleryCountry
        this.GalleryURL = GalleryURL
    }

    fromRowData(rowData) {
        for (const [key, value] of Object.entries(rowData)) {
            this[key] = value;
        }
        return this;
    }

    getImage() {
        return `data:${this.GalleryMimetype};base64,${this.GalleryImage}`
    }
}