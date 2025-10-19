const Joi = require('joi');

// Common validation rules
const commonRules = {
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required',
    }),

  link: Joi.string()
    .trim()
    .uri()
    .required()
    .messages({
      'string.base': 'Link must be a string',
      'string.empty': 'Link cannot be empty',
      'string.uri': 'Link must be a valid URL',
      'any.required': 'Link is required',
    }),

  icon: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Icon must be a string',
      'string.max': 'Icon cannot exceed 100 characters',
    }),
};

const createNavbarSchema = Joi.object({
  name: commonRules.name,
  link: commonRules.link,
  icon: commonRules.icon,
});

const updateNavbarSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
    }),

  link: Joi.string()
    .trim()
    .uri()
    .optional()
    .messages({
      'string.base': 'Link must be a string',
      'string.empty': 'Link cannot be empty',
      'string.uri': 'Link must be a valid URL',
    }),

  icon: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Icon must be a string',
      'string.max': 'Icon cannot exceed 100 characters',
    }),
});

const validateCreateNavbar = (req, res, next) => {
  const { error, value } = createNavbarSchema.validate(req.body, {
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

const validateUpdateNavbar = (req, res, next) => {
  const { error, value } = updateNavbarSchema.validate(req.body, {
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
  createNavbarSchema,
  updateNavbarSchema,
  validateCreateNavbar,
  validateUpdateNavbar,
};

