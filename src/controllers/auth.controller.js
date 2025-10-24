const authService = require('../services/auth.service');
const statusCodes = require('../constants/statusCodes.constant');
const { asyncHandler } = require('../middleware/error.middleware');
const { logAuth } = require('../utils/auditLogger');

// Email/Password Registration
const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  logAuth.register(user.id, user.email, req.ip);

  return res.status(statusCodes.CREATED).json({
    success: true,
    message: 'User registered successfully. Please check your email to verify your account.',
    data: user,
  });
});

// Email/Password Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);

    // Log successful login
    logAuth.login(result.user.id, req.ip, req.get('user-agent'));

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    // Log failed login
    logAuth.loginFailed(email, req.ip, error.message);
    throw error;
  }
});

// Social Authentication - Google
const googleAuth = (req, res, next) => {
  // This will be handled by passport middleware
  next();
};

const googleCallback = asyncHandler(async (req, res, next) => {
  try {
    const profile = req.user;
    if (!profile) {
      return next(new Error('Google authentication failed'));
    }

    const user = await authService.findOrCreateSocialUser(profile, 'google');
    const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.update({
      refreshToken,
      refreshTokenExpiresAt,
    });

    // Log successful login
    logAuth.login(user.id, req.ip, req.get('user-agent'));

    res.json({
      success: true,
      message: 'Google authentication successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          provider: user.provider,
          avatar: user.avatar
        },
        accessToken,
        refreshToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
});

// Social Authentication - Facebook
const facebookAuth = (req, res, next) => {
  // This will be handled by passport middleware
  next();
};

const facebookCallback = asyncHandler(async (req, res, next) => {
  try {
    const profile = req.user;
    if (!profile) {
      return next(new Error('Facebook authentication failed'));
    }

    const user = await authService.findOrCreateSocialUser(profile, 'facebook');
    const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.update({
      refreshToken,
      refreshTokenExpiresAt,
    });

    // Log successful login
    logAuth.login(user.id, req.ip, req.get('user-agent'));

    res.json({
      success: true,
      message: 'Facebook authentication successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          provider: user.provider,
          avatar: user.avatar
        },
        accessToken,
        refreshToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
});

// Social Authentication - GitHub
const githubAuth = (req, res, next) => {
  // This will be handled by passport middleware
  next();
};

const githubCallback = asyncHandler(async (req, res, next) => {
  try {
    const profile = req.user;
    if (!profile) {
      return next(new Error('GitHub authentication failed'));
    }

    const user = await authService.findOrCreateSocialUser(profile, 'github');
    const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.update({
      refreshToken,
      refreshTokenExpiresAt,
    });

    // Log successful login
    logAuth.login(user.id, req.ip, req.get('user-agent'));

    res.json({
      success: true,
      message: 'GitHub authentication successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          provider: user.provider,
          avatar: user.avatar
        },
        accessToken,
        refreshToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
});

// Social Authentication - LinkedIn
const linkedinAuth = (req, res, next) => {
  // This will be handled by passport middleware
  next();
};

const linkedinCallback = asyncHandler(async (req, res, next) => {
  try {
    const profile = req.user;
    if (!profile) {
      return next(new Error('LinkedIn authentication failed'));
    }

    const user = await authService.findOrCreateSocialUser(profile, 'linkedin');
    const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.update({
      refreshToken,
      refreshTokenExpiresAt,
    });

    // Log successful login
    logAuth.login(user.id, req.ip, req.get('user-agent'));

    res.json({
      success: true,
      message: 'LinkedIn authentication successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
          lastLogin: user.lastLogin,
          provider: user.provider,
          avatar: user.avatar
        },
        accessToken,
        refreshToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
});

// Email Verification
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const result = await authService.verifyEmail(email, otp);

  // Log email verification
  if (result.user) {
    logAuth.emailVerified(result.user.id, email);
  }

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await authService.forgotPassword(email);

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password } = req.body;
  const result = await authService.resetPassword(otp, password);

  // Log password reset
  if (result.user) {
    logAuth.passwordReset(result.user.id, req.ip);
  }

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

// Logout
const logout = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const token = req.headers['authorization']?.split(' ')[1];
  const result = await authService.logout(userId, token);

  // Log logout
  logAuth.logout(userId, req.ip);

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await authService.getCurrentUser(userId);

  return res.status(statusCodes.OK).json({
    success: true,
    message: 'User profile retrieved successfully',
    data: user,
  });
});

// Change Password
const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePassword(userId, currentPassword, newPassword);

  // Log password change
  logAuth.passwordChange(userId, req.ip);

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await authService.updateProfile(userId, req.body);

  // Log profile update
  logAuth.profileUpdate(userId, req.ip);

  return res.status(statusCodes.OK).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

// Refresh Token
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken);

  return res.status(statusCodes.OK).json({
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

// Resend Email Verification
const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await authService.resendEmailVerification(email);

  return res.status(statusCodes.OK).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  register,
  login,
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  githubAuth,
  githubCallback,
  linkedinAuth,
  linkedinCallback,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser,
  changePassword,
  updateProfile,
  refreshToken,
  resendEmailVerification,
};
