const DatabaseResult = require('./DatabaseResult')
const json2xml = require('json2xml')

module.exports = class Exhibiton extends DatabaseResult {
    constructor(pExhibitionId = undefined, pExhibitionDate = undefined, pExhibitionName = undefined, pExhibitionUrl = undefined) {
        super(DatabaseResult);
        this.ExhibitonId = pExhibitionId;
        this.ExhibitionDate = pExhibitionDate;
        this.ExhibitionName = pExhibitionName
        this.ExhibitionUrl = pExhibitionUrl;
    }

    formatDate() {
        return new Date(this.ExhibitionDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    getDisplay(form = false) {
        return {
            ExhibitionId: this.ExhibitionId,
            ExhibitionName: this.ExhibitionName,
            ExhibitionDate: form ? this.ExhibitionDate : this.formatDate(),
            ExhibitionUrl: this.ExhibitionUrl
        }
    }

    toJSON() {
        return {
            Exhibition: {
                Name: this.ExhibitionName,
                Date: this.formatDate(),
                Website: this.ExhibitionUrl
            }
        }
    }

}