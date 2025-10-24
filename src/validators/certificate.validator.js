const Joi = require('joi');

const validateCreateCertificate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Title is required',
        'string.base': 'Title must be a string',
        'any.required': 'Title is required',
      }),
    issuer: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Issuer is required',
        'string.base': 'Issuer must be a string',
        'any.required': 'Issuer is required',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    credentialUrl: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'Credential URL must be a valid URL',
      }),
    credentialId: Joi.string().allow('', null).optional().trim(),
    issueDate: Joi.date().iso().allow(null).optional(),
    expiryDate: Joi.date()
      .iso()
      .allow(null)
      .optional()
      .greater(Joi.ref('issueDate'))
      .messages({
        'date.greater': 'Expiry date must be after issue date',
      }),
    image: Joi.string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.uri': 'Image must be a valid URL',
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

const validateUpdateCertificate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    issuer: Joi.string().optional(),
    description: Joi.string().optional(),
    credentialUrl: Joi.string().uri().optional(),
    credentialId: Joi.string().optional(),
    issueDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
    image: Joi.string().uri().optional(),
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
  validateCreateCertificate,
  validateUpdateCertificate,
};
