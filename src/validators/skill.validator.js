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


const createSkillSchema = Joi.object({
  name: commonRules.name,
  icon: commonRules.icon,
});


const updateSkillSchema = Joi.object({
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


const validateCreateSkill = (req, res, next) => {
  const { error, value } = createSkillSchema.validate(req.body, {
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

const validateUpdateSkill = (req, res, next) => {
  const { error, value } = updateSkillSchema.validate(req.body, {
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
  createSkillSchema,
  updateSkillSchema,
  validateCreateSkill,
  validateUpdateSkill,
};
