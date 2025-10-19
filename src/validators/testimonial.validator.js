const Joi = require('joi');

// Common validation rules
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

  message: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.base': 'Message must be a string',
      'string.empty': 'Message cannot be empty',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 1000 characters',
      'any.required': 'Message is required',
    }),

  image: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.base': 'Image must be a string',
      'string.empty': 'Image cannot be empty',
      'string.uri': 'Image must be a valid URL',
      'any.required': 'Image is required',
    }),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
      'any.required': 'Rating is required',
    }),

  position: Joi.string()
    .trim()
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.base': 'Position must be a string',
      'string.max': 'Position cannot exceed 100 characters',
    }),
};

// Create Testimonial Schema
const createTestimonialSchema = Joi.object({
  name: commonRules.name,
  message: commonRules.message,
  image: commonRules.image,
  rating: commonRules.rating,
  position: commonRules.position,
});

// Update Testimonial Schema (all fields optional)
const updateTestimonialSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  message: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .optional()
    .messages({
      'string.base': 'Message must be a string',
      'string.empty': 'Message cannot be empty',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 1000 characters',
    }),

  image: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .messages({
      'string.base': 'Image must be a string',
      'string.empty': 'Image cannot be empty',
      'string.uri': 'Image must be a valid URL',
    }),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .optional()
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
    }),

  position: commonRules.position,
});

// Validation middleware
const validateCreateTestimonial = (req, res, next) => {
  const { error, value } = createTestimonialSchema.validate(req.body, {
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

const validateUpdateTestimonial = (req, res, next) => {
  const { error, value } = updateTestimonialSchema.validate(req.body, {
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
  createTestimonialSchema,
  updateTestimonialSchema,
  validateCreateTestimonial,
  validateUpdateTestimonial,
};

