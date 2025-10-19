const Joi = require('joi');

// Common validation rules
const commonRules = {
  question: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.base': 'Question must be a string',
      'string.empty': 'Question cannot be empty',
      'string.min': 'Question must be at least 5 characters long',
      'string.max': 'Question cannot exceed 500 characters',
      'any.required': 'Question is required',
    }),

  answer: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.base': 'Answer must be a string',
      'string.empty': 'Answer cannot be empty',
      'string.min': 'Answer must be at least 10 characters long',
      'string.max': 'Answer cannot exceed 1000 characters',
      'any.required': 'Answer is required',
    }),
};

// Create FAQ Schema
const createFAQSchema = Joi.object({
  question: commonRules.question,
  answer: commonRules.answer,
});

// Update FAQ Schema (all fields optional)
const updateFAQSchema = Joi.object({
  question: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .optional()
    .messages({
      'string.base': 'Question must be a string',
      'string.empty': 'Question cannot be empty',
      'string.min': 'Question must be at least 5 characters long',
      'string.max': 'Question cannot exceed 500 characters',
    }),

  answer: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .optional()
    .messages({
      'string.base': 'Answer must be a string',
      'string.empty': 'Answer cannot be empty',
      'string.min': 'Answer must be at least 10 characters long',
      'string.max': 'Answer cannot exceed 1000 characters',
    }),
});

// Validation middleware
const validateCreateFAQ = (req, res, next) => {
  const { error, value } = createFAQSchema.validate(req.body, {
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

const validateUpdateFAQ = (req, res, next) => {
  const { error, value } = updateFAQSchema.validate(req.body, {
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
  createFAQSchema,
  updateFAQSchema,
  validateCreateFAQ,
  validateUpdateFAQ,
};

