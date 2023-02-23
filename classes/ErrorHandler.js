module.exports = class ErrorHandler {
    constructor(status, message = undefined) {
        this.status=status
        this.message=message
    }

    getErrorMessage(status = undefined) {
        switch (status || this.status) {
            case 404: 
                return 'Page not found'
            case 500:
                return 'Server Error'
            default:
                return 'An unknown error occurred'
        }
    }

    getError() {
        const error = new Error(this.message || this.getErrorMessage());
        error.status=this.status;
        return error;
    }
}