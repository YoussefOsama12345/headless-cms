const Joi = require('joi');

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

  emailVerified: Joi.boolean()
    .optional()
    .default(false)
    .messages({
      'boolean.base': 'Email verified must be a boolean',
    }),

  isActive: Joi.boolean()
    .optional()
    .default(true)
    .messages({
      'boolean.base': 'Is active must be a boolean',
    }),
};

// Create user validation schema
const createUserSchema = Joi.object({
  name: commonRules.name,
  email: commonRules.email,
  password: commonRules.password,
  role: commonRules.role,
  emailVerified: commonRules.emailVerified,
  isActive: commonRules.isActive,
});

// Update user validation schema
const updateUserSchema = Joi.object({
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

  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Invalid email address',
    }),

  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`])[A-Za-z\d@$!%*?&_\-+=\[\]{}|\\:";'<>.,/#~`]{8,50}$/)
    .optional()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 50 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
    }),

  role: Joi.string()
    .valid('admin', 'editor', 'user')
    .optional()
    .messages({
      'string.base': 'Role must be a string',
      'any.only': 'Role must be admin, editor, or user',
    }),

  emailVerified: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Email verified must be a boolean',
    }),

  isActive: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Is active must be a boolean',
    }),
});

// Validation middleware for create
const validateCreateUser = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body, {
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

// Validation middleware for update
const validateUpdateUser = (req, res, next) => {
  const { error, value } = updateUserSchema.validate(req.body, {
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
  validateCreateUser,
  validateUpdateUser,
};
