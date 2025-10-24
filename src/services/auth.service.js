const { User } = require('../models');
const { comparePassword } = require('../utils/hash');
const {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
  verifyToken,
} = require('../utils/jwt');

const { sendMailWithTemplate } = require('../utils/mailer');
const { generateOTP } = require('../utils/otp');
const env = require('../config/env');
const AppError = require('../utils/appError');
const { revokeToken } = require('../utils/tokenBlacklist');

const register = async (userData) => {
  if (!userData.password) {
    throw new AppError('Password is required for email registration', 400);
  }

  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  const { otp, otpExpiresAt } = generateOTP();
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    emailVerificationOtp: otp,
    emailVerificationOtpExpiresAt: otpExpiresAt,
    provider: 'local',
  });

  // Send verification email
  await sendMailWithTemplate(
    user.email,
    'Verify Your Email - Headless CMS',
    'otp-email',
    {
      userName: user.name,
      otpCode: otp,
      expiryTime: env.OTP_EXPIRE_MINUTES.toString(),
      supportUrl: `${env.FRONTEND_URL}/support`,
      githubUrl: env.GITHUB_URL || 'https://github.com',
      linkedinUrl: env.LINKEDIN_URL || 'https://linkedin.com',
      websiteUrl: env.WEBSITE_URL || 'https://example.com',
      currentYear: new Date().getFullYear(),
      authorName: env.AUTHOR_NAME || 'Your Name',
      userEmail: user.email,
      unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
    }
  );

  // Send welcome email
  try {
    await sendMailWithTemplate(
      user.email,
      'Welcome to Headless CMS!',
      'welcome-email',
      {
        userName: user.name,
        userEmail: user.email,
        dashboardUrl: `${env.FRONTEND_URL}/dashboard`,
        supportUrl: `${env.FRONTEND_URL}/support`,
        githubUrl: env.GITHUB_URL || 'https://github.com',
        linkedinUrl: env.LINKEDIN_URL || 'https://linkedin.com',
        websiteUrl: env.WEBSITE_URL || 'https://example.com',
        currentYear: new Date().getFullYear(),
        authorName: env.AUTHOR_NAME || 'Your Name',
        unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
      }
    );
  } catch (error) {
    console.error('Failed to send welcome email:', error.message);
  }

  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.emailVerificationOtp;
  delete userObj.emailVerificationOtpExpiresAt;
  delete userObj.resetPasswordOtp;
  delete userObj.otpExpiresAt;
  delete userObj.refreshToken;
  delete userObj.refreshTokenExpiresAt;

  return userObj;
};


const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.password) {
    throw new AppError('This account was created with social authentication. Please use Google/Facebook/GitHub/LinkedIn login.', 401);
  }

  if (user.deletedAt) {
    throw new AppError('Account has been deleted', 401);
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const lockoutTimeRemaining = Math.ceil((user.lockedUntil - new Date()) / 1000 / 60);
    throw new AppError(`Account is locked due to too many failed login attempts. Try again in ${lockoutTimeRemaining} minutes.`, 423);
  }

  if (!user.emailVerified) {
    throw new AppError(
      'Please verify your email before logging in. Check your inbox for the verification code.',
      403
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const failedAttempts = (user.failedLoginAttempts || 0) + 1;
    const lockoutDuration = 30 * 60 * 1000; // 30 minutes
    const maxAttempts = 5;
    const updateData = {
      failedLoginAttempts: failedAttempts,
    };

    if (failedAttempts >= maxAttempts) {
      updateData.lockedUntil = new Date(Date.now() + lockoutDuration);
    }

    await user.update(updateData);

    if (failedAttempts >= maxAttempts) {
      throw new AppError(`Account locked due to too many failed login attempts. Try again in 30 minutes.`, 423);
    }

    const remainingAttempts = maxAttempts - failedAttempts;
    throw new AppError(`Invalid email or password. ${remainingAttempts} attempts remaining.`, 401);
  }


  await user.update({
    lastLogin: new Date(),
    failedLoginAttempts: 0,
    lockedUntil: null,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await user.update({
    refreshToken,
    refreshTokenExpiresAt,
  });

  // Send login notification
  try {
    await sendMailWithTemplate(
      user.email,
      'Login Notification - Headless CMS',
      'login-notification',
      {
        userName: user.name,
        loginDate: new Date().toLocaleString(),
        ipAddress: 'Unknown',
        location: 'Unknown',
        deviceInfo: 'Unknown',
        changePasswordUrl: `${env.FRONTEND_URL}/change-password`,
        supportUrl: `${env.FRONTEND_URL}/support`,
        currentYear: new Date().getFullYear(),
        authorName: env.AUTHOR_NAME || 'Your Name',
        userEmail: user.email,
        unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
      }
    );
  } catch (error) {
    console.error('Failed to send login notification email:', error.message);
  }

  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.emailVerificationOtp;
  delete userObj.emailVerificationOtpExpiresAt;
  delete userObj.resetPasswordOtp;
  delete userObj.otpExpiresAt;
  delete userObj.refreshToken;
  delete userObj.refreshTokenExpiresAt;

  return {
    user: userObj,
    accessToken,
    refreshToken,
    expiresIn: 3600, // 1 hour
  };
};

// Social Authentication - Find or Create User
const findOrCreateSocialUser = async (profile, provider) => {
  try {
    let user;
    const providerIdField = `${provider}Id`;

    // Check if user exists with this social ID
    user = await User.findOne({ where: { [providerIdField]: profile.id } });
    if (user) {
      user.lastLogin = new Date();
      user.failedLoginAttempts = 0;
      user.lockedUntil = null;
      await user.save();
      return user;
    }

    // Check if user exists with this email
    const existingUser = await User.findOne({
      where: { email: profile.emails[0].value }
    });

    if (existingUser) {
      // Link social account to existing user
      existingUser[providerIdField] = profile.id;
      existingUser.emailVerified = true;
      existingUser.lastLogin = new Date();
      existingUser.failedLoginAttempts = 0;
      existingUser.lockedUntil = null;
      existingUser.provider = provider;
      await existingUser.save();
      return existingUser;
    }

    // Create new user
    const userData = {
      name: profile.displayName || profile.name?.givenName + ' ' + profile.name?.familyName,
      email: profile.emails[0].value,
      emailVerified: true,
      [providerIdField]: profile.id,
      lastLogin: new Date(),
      failedLoginAttempts: 0,
      lockedUntil: null,
      role: 'user',
      provider: provider,
      avatar: profile.photos?.[0]?.value || null,
    };

    user = await User.create(userData);

    // Send welcome email
    try {
      await sendMailWithTemplate(
        user.email,
        'Welcome to Headless CMS!',
        'welcome-email',
        {
          userName: user.name,
          userEmail: user.email,
          dashboardUrl: `${env.FRONTEND_URL}/dashboard`,
          supportUrl: `${env.FRONTEND_URL}/support`,
          githubUrl: env.GITHUB_URL || 'https://github.com',
          linkedinUrl: env.LINKEDIN_URL || 'https://linkedin.com',
          websiteUrl: env.WEBSITE_URL || 'https://example.com',
          currentYear: new Date().getFullYear(),
          authorName: env.AUTHOR_NAME || 'Your Name',
          unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
        }
      );
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError.message);
    }

    return user;
  } catch (error) {
    throw new Error(`${provider} authentication failed: ${error.message}`);
  }
};

// Email Verification
const verifyEmail = async (email, otp) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.emailVerified) {
    return { message: 'Email already verified' };
  }

  if (!user.emailVerificationOtp) {
    throw new AppError('No verification OTP found. Please register again.', 400);
  }

  if (user.emailVerificationOtp !== otp) {
    throw new AppError('Invalid OTP', 401);
  }

  if (user.emailVerificationOtpExpiresAt < new Date()) {
    throw new AppError('OTP has expired. Please request a new one.', 401);
  }

  await user.update({
    emailVerified: true,
    emailVerificationOtp: null,
    emailVerificationOtpExpiresAt: null,
  });

  return { message: 'Email verified successfully' };
};

// Forgot Password
const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { message: 'If email exists, password reset link has been sent' };
  }

  const { otp, otpExpiresAt } = generateOTP();
  await user.update({
    resetPasswordOtp: otp,
    otpExpiresAt,
  });

  await sendMailWithTemplate(
    user.email,
    'Reset Your Password - Headless CMS',
    'otp-email',
    {
      userName: user.name,
      otpCode: otp,
      expiryTime: env.OTP_EXPIRE_MINUTES.toString(),
      supportUrl: `${env.FRONTEND_URL}/support`,
      githubUrl: env.GITHUB_URL || 'https://github.com',
      linkedinUrl: env.LINKEDIN_URL || 'https://linkedin.com',
      websiteUrl: env.WEBSITE_URL || 'https://example.com',
      currentYear: new Date().getFullYear(),
      authorName: env.AUTHOR_NAME || 'Your Name',
      userEmail: user.email,
      unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
    }
  );

  return { message: 'Password reset OTP has been sent to your email' };
};

// Reset Password
const resetPassword = async (otp, newPassword) => {
  const user = await User.findOne({
    where: { resetPasswordOtp: otp }
  });

  if (!user) {
    throw new AppError('Invalid or expired OTP', 401);
  }

  if (user.otpExpiresAt < new Date()) {
    throw new AppError('OTP has expired', 401);
  }

  await user.update({
    password: newPassword,
    resetPasswordOtp: null,
    otpExpiresAt: null,
    failedLoginAttempts: 0,
    lockedUntil: null,
  });

  // Send password reset confirmation
  try {
    await sendMailWithTemplate(
      user.email,
      'Password Reset Confirmation - Headless CMS',
      'password-reset-confirmation',
      {
        userName: user.name,
        userEmail: user.email,
        resetDate: new Date().toLocaleString(),
        ipAddress: 'Unknown',
        deviceInfo: 'Unknown',
        loginUrl: `${env.FRONTEND_URL}/login`,
        securityUrl: `${env.FRONTEND_URL}/security`,
        supportUrl: `${env.FRONTEND_URL}/support`,
        currentYear: new Date().getFullYear(),
        authorName: env.AUTHOR_NAME || 'Your Name',
        unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
      }
    );
  } catch (error) {
    console.error('Failed to send password reset confirmation email:', error.message);
  }

  return { message: 'Password reset successfully', user };
};

// Logout
const logout = async (userId, accessToken) => {
  const user = await User.findByPk(userId);
  if (user) {
    await user.update({
      lastLogout: new Date(),
      refreshToken: null,
      refreshTokenExpiresAt: null
    });
  }

  if (accessToken) {
    revokeToken(accessToken);
  }

  return { message: 'Logout successful' };
};

// Get Current User
const getCurrentUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.emailVerificationOtp;
  delete userObj.emailVerificationOtpExpiresAt;
  delete userObj.resetPasswordOtp;
  delete userObj.otpExpiresAt;
  delete userObj.refreshToken;
  delete userObj.refreshTokenExpiresAt;

  return userObj;
};

// Change Password
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (!user.password) {
    throw new AppError('This account was created with social authentication. Cannot change password.', 400);
  }

  const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new AppError('Current password is incorrect', 401);
  }

  await user.update({ password: newPassword });
  return { message: 'Password changed successfully' };
};

// Update Profile
const updateProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Remove sensitive fields that shouldn't be updated via this endpoint
  const { password, email, role, ...allowedUpdates } = updateData;

  await user.update(allowedUpdates);

  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.emailVerificationOtp;
  delete userObj.emailVerificationOtpExpiresAt;
  delete userObj.resetPasswordOtp;
  delete userObj.otpExpiresAt;
  delete userObj.refreshToken;
  delete userObj.refreshTokenExpiresAt;

  return userObj;
};

// Resend Email Verification
const resendEmailVerification = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.emailVerified) {
    return { message: 'Email already verified' };
  }

  const { otp, otpExpiresAt } = generateOTP();
  await user.update({
    emailVerificationOtp: otp,
    emailVerificationOtpExpiresAt: otpExpiresAt,
  });

  await sendMailWithTemplate(
    user.email,
    'Verify Your Email - Headless CMS',
    'otp-email',
    {
      userName: user.name,
      otpCode: otp,
      expiryTime: env.OTP_EXPIRE_MINUTES.toString(),
      supportUrl: `${env.FRONTEND_URL}/support`,
      githubUrl: env.GITHUB_URL || 'https://github.com',
      linkedinUrl: env.LINKEDIN_URL || 'https://linkedin.com',
      websiteUrl: env.WEBSITE_URL || 'https://example.com',
      currentYear: new Date().getFullYear(),
      authorName: env.AUTHOR_NAME || 'Your Name',
      userEmail: user.email,
      unsubscribeUrl: `${env.FRONTEND_URL}/unsubscribe`,
    }
  );

  return { message: 'Verification email sent successfully' };
};

// Refresh Access Token
const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyToken(refreshToken);
  if (!decoded || decoded.type !== 'refresh') {
    throw new AppError('Invalid refresh token', 401);
  }

  const user = await User.findOne({
    where: {
      id: decoded.id,
      refreshToken: refreshToken,
    },
  });

  if (!user) {
    throw new AppError('Invalid refresh token', 401);
  }

  if (user.refreshTokenExpiresAt < new Date()) {
    throw new AppError('Refresh token expired', 401);
  }

  const accessToken = generateAccessToken(user);
  return {
    accessToken,
    expiresIn: 3600,
  };
};

module.exports = {
  register,
  login,
  findOrCreateSocialUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser,
  changePassword,
  updateProfile,
  resendEmailVerification,
  refreshAccessToken,
};
