const Joi = require('joi');

// Common validation rules
const commonRules = {
  sectionTitle: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Section title must be a string',
      'string.empty': 'Section title cannot be empty',
      'string.min': 'Section title must be at least 2 characters long',
      'string.max': 'Section title cannot exceed 100 characters',
      'any.required': 'Section title is required',
    }),

  linkTitle: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.base': 'Link title must be a string',
      'string.empty': 'Link title cannot be empty',
      'string.min': 'Link title must be at least 1 character long',
      'string.max': 'Link title cannot exceed 50 characters',
      'any.required': 'Link title is required',
    }),

  linkUrl: Joi.string()
    .trim()
    .uri()
    .required()
    .messages({
      'string.base': 'Link URL must be a string',
      'string.empty': 'Link URL cannot be empty',
      'string.uri': 'Link URL must be a valid URL',
      'any.required': 'Link URL is required',
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

  order: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Order must be a number',
      'number.integer': 'Order must be an integer',
      'number.min': 'Order must be 0 or greater',
    }),
};

const createFooterSchema = Joi.object({
  sectionTitle: commonRules.sectionTitle,
  linkTitle: commonRules.linkTitle,
  linkUrl: commonRules.linkUrl,
  icon: commonRules.icon,
  order: commonRules.order,
});

const updateFooterSchema = Joi.object({
  sectionTitle: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Section title must be a string',
      'string.empty': 'Section title cannot be empty',
      'string.min': 'Section title must be at least 2 characters long',
      'string.max': 'Section title cannot exceed 100 characters',
    }),

  linkTitle: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.base': 'Link title must be a string',
      'string.empty': 'Link title cannot be empty',
      'string.min': 'Link title must be at least 1 character long',
      'string.max': 'Link title cannot exceed 50 characters',
    }),

  linkUrl: Joi.string()
    .trim()
    .uri()
    .optional()
    .messages({
      'string.base': 'Link URL must be a string',
      'string.empty': 'Link URL cannot be empty',
      'string.uri': 'Link URL must be a valid URL',
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

  order: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'Order must be a number',
      'number.integer': 'Order must be an integer',
      'number.min': 'Order must be 0 or greater',
    }),
});

const validateCreateFooter = (req, res, next) => {
  const { error, value } = createFooterSchema.validate(req.body, {
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

const validateUpdateFooter = (req, res, next) => {
  const { error, value } = updateFooterSchema.validate(req.body, {
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
  createFooterSchema,
  updateFooterSchema,
  validateCreateFooter,
  validateUpdateFooter,
};

