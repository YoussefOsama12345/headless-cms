const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const {
  loginRateLimit,
  passwordResetRateLimit,
  emailVerificationRateLimit,
  registerRateLimit,
} = require('../middleware/rateLimit.middleware');

const {
  validateRegister,
  validateLogin,
  validateVerifyEmail,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateUpdateProfile,
  validateRefreshToken,
  validateResendEmailVerification,
} = require('../validators/auth.validator');

const router = express.Router();

// Email/Password Authentication Routes
router.post('/register', registerRateLimit, validateRegister, authController.register);
router.post('/login', loginRateLimit, validateLogin, authController.login);
router.post('/verify-email', validateVerifyEmail, authController.verifyEmail);
router.post('/forgot-password', passwordResetRateLimit, validateForgotPassword, authController.forgotPassword);
router.post('/reset-password', passwordResetRateLimit, validateResetPassword, authController.resetPassword);
router.post('/resend-verification', emailVerificationRateLimit, validateResendEmailVerification, authController.resendEmailVerification);

// Social Authentication Routes
// Google OAuth
router.get('/google', authController.googleAuth);
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

// Facebook OAuth
router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  authController.facebookCallback
);

// GitHub OAuth
router.get('/github', authController.githubAuth);
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  authController.githubCallback
);

// LinkedIn OAuth
router.get('/linkedin', authController.linkedinAuth);
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  authController.linkedinCallback
);

// Token Management
router.post('/refresh', validateRefreshToken, authController.refreshToken);

// Protected Routes (require authentication)
router.post('/logout', verifyToken, authController.logout);
router.get('/me', verifyToken, authController.getCurrentUser);
router.put('/profile', verifyToken, validateUpdateProfile, authController.updateProfile);
router.put('/change-password', verifyToken, validateChangePassword, authController.changePassword);

module.exports = router;
