// utils/errorHandler.js
exports.handleMongoError = (err) => {
  let message = err.message;

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    message = `Duplicate field value: ${value}. Please use another value for ${field}.`;
  }

  return message;
};
