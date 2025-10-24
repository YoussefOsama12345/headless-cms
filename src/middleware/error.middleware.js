const AppError = require('../utils/appError');
const statusCodes = require('../constants/statusCodes.constant');

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error Details:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  const isOperationalError = err.isOperational || err.statusCode < 500;
  const message = isOperationalError
    ? err.message
    : 'An unexpected error occurred. Please try again later.';
  const response = {
    success: false,
    status: err.status,
    message,
  };
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.error = err;
  }
  res.status(err.statusCode).json(response);
};
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
module.exports = {
  globalErrorHandler,
  asyncHandler,
};
