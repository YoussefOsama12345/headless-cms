const Joi = require('joi');

const validateCreateSetting = (req, res, next) => {
  const schema = Joi.object({
    key: Joi.string()
      .required()
      .trim()
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        'string.empty': 'Key is required',
        'string.base': 'Key must be a string',
        'any.required': 'Key is required',
        'string.pattern.base': 'Key must contain only letters, numbers, and underscores',
      }),
    value: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Value is required',
        'string.base': 'Value must be a string',
        'any.required': 'Value is required',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    type: Joi.string()
      .valid('string', 'number', 'boolean', 'json')
      .optional()
      .default('string')
      .messages({
        'any.only': 'Type must be one of: string, number, boolean, json',
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

const validateUpdateSetting = (req, res, next) => {
  const schema = Joi.object({
    key: Joi.string().optional(),
    value: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.string().valid('string', 'number', 'boolean', 'json').optional(),
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
  validateCreateSetting,
  validateUpdateSetting,
};
