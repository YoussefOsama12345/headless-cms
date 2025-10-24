const Joi = require('joi');

// Common validation rules based on User model
const commonRules = {
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`])[A-Za-z\d@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`]{8,50}$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 50 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
      'any.required': 'Password is required',
    }),

  role: Joi.string()
    .valid('admin', 'editor', 'user')
    .default('user')
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be admin, editor, or user',
    }),

  otp: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.base': 'OTP must be a string',
      'string.empty': 'OTP cannot be empty',
      'string.length': 'OTP must be exactly 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP is required',
    }),

  currentPassword: Joi.string()
    .required()
    .messages({
      'string.base': 'Current password must be a string',
      'string.empty': 'Current password cannot be empty',
      'any.required': 'Current password is required',
    }),

  newPassword: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`])[A-Za-z\d@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`]{8,50}$/)
    .required()
    .messages({
      'string.base': 'New password must be a string',
      'string.empty': 'New password cannot be empty',
      'string.min': 'New password must be at least 8 characters long',
      'string.max': 'New password cannot exceed 50 characters',
      'string.pattern.base': 'New password must include uppercase, lowercase, number, and special character',
      'any.required': 'New password is required',
    }),

  refreshToken: Joi.string()
    .required()
    .messages({
      'string.base': 'Refresh token must be a string',
      'string.empty': 'Refresh token cannot be empty',
      'any.required': 'Refresh token is required',
    }),
};

// Registration validation schema
const registerSchema = Joi.object({
  name: commonRules.name,
  email: commonRules.email,
  password: commonRules.password,
  role: commonRules.role,
});

// Login validation schema
const loginSchema = Joi.object({
  email: commonRules.email,
  password: Joi.string()
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
    }),
});

// Email verification validation schema
const verifyEmailSchema = Joi.object({
  email: commonRules.email,
  otp: commonRules.otp,
});

// Forgot password validation schema
const forgotPasswordSchema = Joi.object({
  email: commonRules.email,
});

// Reset password validation schema
const resetPasswordSchema = Joi.object({
  otp: commonRules.otp,
  password: commonRules.password,
});

// Change password validation schema
const changePasswordSchema = Joi.object({
  currentPassword: commonRules.currentPassword,
  newPassword: commonRules.newPassword,
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  avatar: Joi.string()
    .uri()
    .optional()
    .allow('')
    .messages({
      'string.base': 'Avatar must be a string',
      'string.uri': 'Avatar must be a valid URL',
    }),
});

// Refresh token validation schema
const refreshTokenSchema = Joi.object({
  refreshToken: commonRules.refreshToken,
});

// Resend email verification validation schema
const resendEmailVerificationSchema = Joi.object({
  email: commonRules.email,
});

// Validation middleware functions
const validateRegister = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateVerifyEmail = (req, res, next) => {
  const { error, value } = verifyEmailSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateForgotPassword = (req, res, next) => {
  const { error, value } = forgotPasswordSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateResetPassword = (req, res, next) => {
  const { error, value } = resetPasswordSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateChangePassword = (req, res, next) => {
  const { error, value } = changePasswordSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateUpdateProfile = (req, res, next) => {
  const { error, value } = updateProfileSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateRefreshToken = (req, res, next) => {
  const { error, value } = refreshTokenSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

const validateResendEmailVerification = (req, res, next) => {
  const { error, value } = resendEmailVerificationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  
  req.body = value;
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateVerifyEmail,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  validateUpdateProfile,
  validateRefreshToken,
  validateResendEmailVerification,
};




