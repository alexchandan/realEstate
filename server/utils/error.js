// error handler for sending the erro manually.
export const errorHandler = ((statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
})