json2xml = require('json2xml')

module.exports = class DatabaseResult {
    constructor() { }

    fromRowData(rowData) {
        for (const [key, value] of Object.entries(rowData)) {
            this[key] = value;
        }
        return this;
    }

    toJSON() {
        return {
            DatabaseResult : this
        }
    }

    toXML() {
        return json2xml(this.toJSON())
    }
}