const Joi = require('joi');

const validateCreateAbout = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Title is required',
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    bio: Joi.string().allow('', null).optional().trim(),
    name: Joi.string().allow('', null).optional().trim(),
    tagline: Joi.string().allow('', null).optional().trim(),
    image: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'Image must be a valid URL',
      }),
    email: Joi.string()
      .email()
      .allow('', null)
      .optional()
      .trim()
      .lowercase()
      .messages({
        'string.email': 'Invalid email address',
      }),
    phone: Joi.string().allow('', null).optional().trim(),
    address: Joi.string().allow('', null).optional().trim(),
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

const validateUpdateAbout = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().optional(),
    description: Joi.string().allow('', null).optional().trim(),
    bio: Joi.string().allow('', null).optional().trim(),
    name: Joi.string().allow('', null).optional().trim(),
    tagline: Joi.string().allow('', null).optional().trim(),
    image: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'Image must be a valid URL',
      }),
    email: Joi.string()
      .email()
      .allow('', null)
      .optional()
      .trim()
      .lowercase()
      .messages({
        'string.email': 'Invalid email address',
      }),
    phone: Joi.string().allow('', null).optional().trim(),
    address: Joi.string().allow('', null).optional().trim(),
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
  validateCreateAbout,
  validateUpdateAbout,
};
