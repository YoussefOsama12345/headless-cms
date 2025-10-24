const Joi = require('joi');

const validateCreateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .min(2)
      .max(100)
      .messages({
        'string.empty': 'Name is required',
        'string.base': 'Name must be a string',
        'any.required': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must not exceed 100 characters',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    slug: Joi.string()
      .allow('', null)
      .optional()
      .trim()
      .lowercase()
      .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .messages({
        'string.pattern.base': 'Slug must be lowercase with hyphens (e.g., my-category)',
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const validateUpdateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    slug: Joi.string().optional(),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
};
