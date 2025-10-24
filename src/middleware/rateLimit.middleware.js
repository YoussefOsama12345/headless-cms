const rateLimit = require('express-rate-limit');
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts, please try again in 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});
const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again in 1 hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const emailVerificationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many verification email requests, please try again in 1 hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many registration attempts, please try again in 1 hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const generalAuthRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many requests, please try again in 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = {
  loginRateLimit,
  passwordResetRateLimit,
  emailVerificationRateLimit,
  registerRateLimit,
  generalAuthRateLimit,
};
