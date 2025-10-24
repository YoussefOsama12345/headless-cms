const winston = require('winston');
const path = require('path');
const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'audit.log'),
      maxsize: 10485760,
      maxFiles: 10
    }),
    new winston.transports.File({
      filename: path.join('logs', 'security.log'),
      level: 'warn',
      maxsize: 10485760,
      maxFiles: 10
    })
  ]
});
if (process.env.NODE_ENV === 'development') {
  auditLogger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}
const logSecurityEvent = (event, userId, details = {}) => {
  auditLogger.info({
    event,
    userId,
    timestamp: new Date().toISOString(),
    ...details
  });
};
const logAuth = {
  login: (userId, ip, userAgent) => {
    logSecurityEvent('LOGIN_SUCCESS', userId, { ip, userAgent });
  },
  loginFailed: (email, ip, reason) => {
    auditLogger.warn({
      event: 'LOGIN_FAILED',
      email,
      reason,
      ip,
      timestamp: new Date().toISOString()
    });
  },
  logout: (userId, ip) => {
    logSecurityEvent('LOGOUT', userId, { ip });
  },
  register: (userId, email, ip) => {
    logSecurityEvent('REGISTER', userId, { email, ip });
  },
  passwordChange: (userId, ip) => {
    logSecurityEvent('PASSWORD_CHANGE', userId, { ip });
  },
  passwordReset: (userId, ip) => {
    logSecurityEvent('PASSWORD_RESET', userId, { ip });
  },
  emailVerified: (userId, email) => {
    logSecurityEvent('EMAIL_VERIFIED', userId, { email });
  },
  profileUpdate: (userId, ip) => {
    logSecurityEvent('PROFILE_UPDATE', userId, { ip });
  },
  accountLocked: (userId, reason) => {
    auditLogger.warn({
      event: 'ACCOUNT_LOCKED',
      userId,
      reason,
      timestamp: new Date().toISOString()
    });
  }
};
const logDataAccess = {
  create: (userId, resource, resourceId) => {
    logSecurityEvent('CREATE', userId, { resource, resourceId });
  },
  read: (userId, resource, resourceId) => {
    logSecurityEvent('READ', userId, { resource, resourceId });
  },
  update: (userId, resource, resourceId) => {
    logSecurityEvent('UPDATE', userId, { resource, resourceId });
  },
  delete: (userId, resource, resourceId) => {
    logSecurityEvent('DELETE', userId, { resource, resourceId });
  }
};
const logSuspicious = (event, details) => {
  auditLogger.warn({
    event: 'SUSPICIOUS_ACTIVITY',
    type: event,
    ...details,
    timestamp: new Date().toISOString()
  });
};
module.exports = {
  logSecurityEvent,
  logAuth,
  logDataAccess,
  logSuspicious,
  auditLogger
};
