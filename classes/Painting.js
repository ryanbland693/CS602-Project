const DatabaseResult = require('./DatabaseResult')
const json2xml = require('json2xml')

module.exports = class Painting extends DatabaseResult {
    constructor(PaintingId = undefined, PaintingImage = undefined,
        PaintingMimetype = undefined, PaintingName = undefined,
        PaintingDescription = undefined, PaintingPrice = undefined,
        PaintingLength = undefined, PaintingWidth = undefined,
        MediumName = undefined, AvailabilityName = undefined) {
        super(DatabaseResult);
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

    isLandscape() {
        return (this.PaintingWidth === undefined || this.PaintingWidth === undefined) ? undefined : this.PaintingWidth > this.PaintingLength
    }

    getImage() {
        return `data:${this.PaintingMimetype};base64,${this.PaintingImage}`
    }

    getDimensions() {
        return `${this.PaintingLength} x ${this.PaintingWidth} cm`
    }

    getPrice() {
        return Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(this.PaintingPrice);
    }

    getDisplay(form = false) {
        return {
            PaintingId: this.PaintingId,
            ImageUrl: this.getImage(),
            PaintingName: this.PaintingName,
            PaintingDescription: this.PaintingDescription,
            PaintingPrice: form ? this.PaintingPrice : this.getPrice(),
            PaintingLength: this.PaintingLength,
            PaintingWidth: this.PaintingWidth,
            PaintingDimensions: this.getDimensions(),
            MediumName: this.MediumName,
            AvailabilityName: this.AvailabilityName
        }
    }

    toJSON() {
        return {
            Painting: {
                Title: this.PaintingName,
                Description: this.PaintingDescription,
                Page: `http://www.localhost:3000/paintings/${this.PaintingId}`,
                Price: this.getPrice(),
                Dimensions: this.getDimensions(),
                Medium: this.MediumName,
                Availability: this.AvailabilityName
            }
        }
    }

    toXML() {
        return json2xml(this.toJSON())
    }

}