const Joi = require('joi');

// Common validation rules
const commonRules = {
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required',
    }),

  icon: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.base': 'Icon must be a string',
      'string.empty': 'Icon cannot be empty',
      'string.min': 'Icon must be at least 1 character long',
      'string.max': 'Icon cannot exceed 100 characters',
      'any.required': 'Icon is required',
    }),
};

// Create Service Schema
const createServiceSchema = Joi.object({
  name: commonRules.name,
  description: commonRules.description,
  icon: commonRules.icon,
});

// Update Service Schema (all fields optional)
const updateServiceSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
    }),

  icon: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Icon must be a string',
      'string.empty': 'Icon cannot be empty',
      'string.min': 'Icon must be at least 1 character long',
      'string.max': 'Icon cannot exceed 100 characters',
    }),
});

// Validation middleware
const validateCreateService = (req, res, next) => {
  const { error, value } = createServiceSchema.validate(req.body, {
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

const validateUpdateService = (req, res, next) => {
  const { error, value } = updateServiceSchema.validate(req.body, {
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
  createServiceSchema,
  updateServiceSchema,
  validateCreateService,
  validateUpdateService,
};
