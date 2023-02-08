module.exports = class Painting {
    constructor(PaintingId = undefined, PaintingImage = undefined,
        PaintingMimetype = undefined, PaintingName = undefined,
        PaintingDescription = undefined, PaintingPrice = undefined,
        PaintingLength = undefined, PaintingWidth = undefined,
        MediumName = undefined, AvailabilityName = undefined) {
        this.PaintingId = PaintingId;
        this.PaintingImage = PaintingImage;
        this.PaintingMimetype = PaintingMimetype;
        this.PaintingName = PaintingName;
        this.PaintingDescription = PaintingDescription;
        this.PaintingPrice = PaintingPrice;
        this.PaintingLength = PaintingLength;
        this.PaintingWidth = PaintingWidth;
        this.MediumName = MediumName;
        this.AvailabilityName = AvailabilityName;
    }

    fromRowData(rowData) {
        for (const [key, value] of Object.entries(rowData)) {
            this[key] = value;
        }
        return this;
    }

    isLandscape() {
        return (this.PaintingWidth === undefined || this.PaintingWidth === undefined) ? undefined : this.PaintingWidth > this.PaintingLength
    }

    getImage() {
        return `data:${this.PaintingMimetype};base64,${this.PaintingImage}`
    }

    getDetailUrl() {
        return `/paintings/${this.PaintingId}`
    }

    getDimensions() {
        return `${this.PaintingLength} x ${this.PaintingWidth} cm`
    }

    getPrice() {
        return Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(this.PaintingPrice);
    }

}