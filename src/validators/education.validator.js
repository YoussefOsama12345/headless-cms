const Joi = require('joi');
const commonRules = {
  institution: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required()
    .messages({
      'string.base': 'Institution must be a string',
      'string.empty': 'Institution cannot be empty',
      'string.min': 'Institution must be at least 2 characters long',
      'string.max': 'Institution cannot exceed 150 characters',
      'any.required': 'Institution is required',
    }),
  degree: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Degree must be a string',
      'string.empty': 'Degree cannot be empty',
      'string.min': 'Degree must be at least 2 characters long',
      'string.max': 'Degree cannot exceed 100 characters',
      'any.required': 'Degree is required',
    }),
  field: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Field must be a string',
      'string.max': 'Field cannot exceed 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(2000)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 2000 characters',
    }),
  startDate: Joi.date()
    .required()
    .messages({
      'date.base': 'Start date must be a valid date',
      'any.required': 'Start date is required',
    }),
  endDate: Joi.date()
    .greater(Joi.ref('startDate'))
    .optional()
    .allow(null, '')
    .messages({
      'date.base': 'End date must be a valid date',
      'date.greater': 'End date must be after start date',
    }),
  location: Joi.string()
    .trim()
    .max(200)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Location must be a string',
      'string.max': 'Location cannot exceed 200 characters',
    }),
  current: Joi.boolean()
    .optional()
    .default(false)
    .messages({
      'boolean.base': 'Current must be a boolean',
    }),
};
const createEducationSchema = Joi.object({
  institution: commonRules.institution,
  degree: commonRules.degree,
  field: commonRules.field,
  description: commonRules.description,
  startDate: commonRules.startDate,
  endDate: commonRules.endDate,
  location: commonRules.location,
  current: commonRules.current,
});
const updateEducationSchema = Joi.object({
  institution: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .optional()
    .messages({
      'string.base': 'Institution must be a string',
      'string.empty': 'Institution cannot be empty',
      'string.min': 'Institution must be at least 2 characters long',
      'string.max': 'Institution cannot exceed 150 characters',
    }),
  degree: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Degree must be a string',
      'string.empty': 'Degree cannot be empty',
      'string.min': 'Degree must be at least 2 characters long',
      'string.max': 'Degree cannot exceed 100 characters',
    }),
  field: Joi.string()
    .trim()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Field must be a string',
      'string.max': 'Field cannot exceed 100 characters',
    }),
  description: Joi.string()
    .trim()
    .max(2000)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 2000 characters',
    }),
  startDate: Joi.date()
    .optional()
    .messages({
      'date.base': 'Start date must be a valid date',
    }),
  endDate: Joi.date()
    .optional()
    .allow(null, '')
    .messages({
      'date.base': 'End date must be a valid date',
    }),
  location: Joi.string()
    .trim()
    .max(200)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Location must be a string',
      'string.max': 'Location cannot exceed 200 characters',
    }),
  current: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Current must be a boolean',
    }),
});
const validateCreateEducation = (req, res, next) => {
  const { error, value } = createEducationSchema.validate(req.body, {
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
const validateUpdateEducation = (req, res, next) => {
  const { error, value } = updateEducationSchema.validate(req.body, {
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
  validateCreateEducation,
  validateUpdateEducation,
};
