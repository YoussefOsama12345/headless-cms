const Joi = require('joi');

const validateCreateSEO = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .max(60)
      .messages({
        'string.empty': 'Title is required',
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
        'string.max': 'Title should not exceed 60 characters for optimal SEO',
      }),
    description: Joi.string()
      .allow('', null)
      .optional()
      .trim()
      .max(160)
      .messages({
        'string.max': 'Description should not exceed 160 characters for optimal SEO',
      }),
    keywords: Joi.string().allow('', null).optional().trim(),
    author: Joi.string().allow('', null).optional().trim(),
    ogTitle: Joi.string().allow('', null).optional().trim().max(60),
    ogDescription: Joi.string().allow('', null).optional().trim().max(160),
    ogImage: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'OG Image must be a valid URL',
      }),
    twitterCard: Joi.string()
      .allow('', null)
      .optional()
      .trim()
      .valid('summary', 'summary_large_image', 'app', 'player')
      .messages({
        'any.only': 'Twitter card must be one of: summary, summary_large_image, app, player',
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

const validateUpdateSEO = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    keywords: Joi.string().optional(),
    author: Joi.string().optional(),
    ogTitle: Joi.string().optional(),
    ogDescription: Joi.string().optional(),
    ogImage: Joi.string().uri().optional(),
    twitterCard: Joi.string().optional(),
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
  validateCreateSEO,
  validateUpdateSEO,
};
