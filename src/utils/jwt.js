const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      type: 'access'
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRE || '1h',
      issuer: env.JWT_ISSUER || 'headless-cms',
      audience: env.JWT_AUDIENCE || 'headless-cms-users'
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: 'refresh'
    },
    env.JWT_REFRESH_SECRET || env.JWT_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRE || '30d',
      issuer: env.JWT_ISSUER || 'headless-cms',
      audience: env.JWT_AUDIENCE || 'headless-cms-users'
    }
  );
};

const generateVerificationToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: 'verification'
    },
    env.JWT_SECRET,
    {
      expiresIn: '24h',
      issuer: env.JWT_ISSUER || 'headless-cms'
    }
  );
};

const generatePasswordResetToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      type: 'password_reset'
    },
    env.JWT_SECRET,
    {
      expiresIn: '1h',
      issuer: env.JWT_ISSUER || 'headless-cms'
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET || env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
  verifyToken,
  verifyRefreshToken,
  decodeToken
};
