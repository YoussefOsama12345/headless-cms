const Joi = require('joi');

const validateCreateBlog = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(200)
      .required()
      .trim()
      .messages({
        'string.empty': 'Title is required',
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must not exceed 200 characters',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    content: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Content is required',
        'string.base': 'Content must be a string',
        'any.required': 'Content is required',
      }),
    author: Joi.string().allow('', null).optional().trim(),
    tags: Joi.string().allow('', null).optional().trim(),
    image: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'Image must be a valid URL',
      }),
    published: Joi.boolean().optional().default(false),
    publishedAt: Joi.date().iso().allow(null).optional(),
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

const validateUpdateBlog = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    content: Joi.string().optional(),
    author: Joi.string().optional(),
    tags: Joi.string().optional(),
    image: Joi.string().uri().optional(),
    published: Joi.boolean().optional(),
    publishedAt: Joi.date().optional(),
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
  validateCreateBlog,
  validateUpdateBlog,
};
