class customErrorApi extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

const createCustomError = (msg, statuscode) => {
    return new customErrorApi(msg, statuscode);
}

module.exports = {createCustomError, customErrorApi};