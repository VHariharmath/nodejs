const {customErrorApi} = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message)
    if (err instanceof customErrorApi) {
        console.log('not coming');
        return res.status(err.statuscode).json({msg: err.message});
    }
    return res.status(500).json({msg: 'something went wrong'});
}

module.exports = errorHandlerMiddleware;