const Joi = require('joi');

const validateCreateMessage = (req, res, next) => {
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
    email: Joi.string()
      .email()
      .required()
      .trim()
      .lowercase()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email address',
        'string.base': 'Email must be a string',
        'any.required': 'Email is required',
      }),
    subject: Joi.string().allow('', null).optional().trim().max(200),
    message: Joi.string()
      .required()
      .trim()
      .min(10)
      .max(5000)
      .messages({
        'string.empty': 'Message is required',
        'string.base': 'Message must be a string',
        'any.required': 'Message is required',
        'string.min': 'Message must be at least 10 characters',
        'string.max': 'Message must not exceed 5000 characters',
      }),
    phone: Joi.string()
      .allow('', null)
      .optional()
      .trim()
      .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
      .messages({
        'string.pattern.base': 'Invalid phone number format',
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

const validateUpdateMessage = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    subject: Joi.string().optional(),
    message: Joi.string().optional(),
    phone: Joi.string().optional(),
    read: Joi.boolean().optional(),
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
  validateCreateMessage,
  validateUpdateMessage,
};
