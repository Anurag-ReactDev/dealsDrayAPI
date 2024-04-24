class clientErrors extends Error{
    constructor(message,statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500?'fail':'error';
        this.isOperational = true; // set to errors that are expected to occur
        Error.captureStackTrace(this,this.constructor) // to know at what file and line the error has occured
    }
}

module.exports = clientErrors;