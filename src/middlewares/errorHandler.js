function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    // Default to a 500 Internal Server Error if no specific status code is provided
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
    });
  }
  
  module.exports = errorHandler;
  