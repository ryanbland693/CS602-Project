module.exports = class DatabaseResult {
    constructor() { }

    fromRowData(rowData) {
        for (const [key, value] of Object.entries(rowData)) {
            this[key] = value;
        }
        return this;
    }
}