const jwt = require('../utils/jwt');
const { User } = require('../models');
const statusCodes = require('../constants/statusCodes.constant');
const { isTokenRevoked } = require('../utils/tokenBlacklist');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Authorization header with Bearer token is required',
      });
    }

    const token = authHeader.split(' ')[1];

    // Check if token is revoked
    if (isTokenRevoked(token)) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Token has been revoked. Please login again.',
      });
    }

    const decoded = jwt.verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.deletedAt) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Account has been deleted',
      });
    }

    if (!user.isActive) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Account is deactivated',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(statusCodes.UNAUTHORIZED || 401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
    });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(statusCodes.UNAUTHORIZED || 401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(statusCodes.FORBIDDEN || 403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
      });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorize
};

