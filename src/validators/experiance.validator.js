const Joi = require('joi');

const validateCreateExperiance = (req, res, next) => {
  const schema = Joi.object({
    company: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Company is required',
        'string.base': 'Company must be a string',
        'any.required': 'Company is required',
      }),
    position: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': 'Position is required',
        'string.base': 'Position must be a string',
        'any.required': 'Position is required',
      }),
    description: Joi.string().allow('', null).optional().trim(),
    responsibilities: Joi.string().allow('', null).optional().trim(),
    location: Joi.string().allow('', null).optional().trim(),
    startDate: Joi.date().iso().allow(null).optional(),
    endDate: Joi.date()
      .iso()
      .allow(null)
      .optional()
      .when('current', {
        is: false,
        then: Joi.date().greater(Joi.ref('startDate')).messages({
          'date.greater': 'End date must be after start date',
        }),
        otherwise: Joi.optional(),
      }),
    current: Joi.boolean().optional().default(false),
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

const validateUpdateExperiance = (req, res, next) => {
  const schema = Joi.object({
    company: Joi.string().optional(),
    position: Joi.string().optional(),
    description: Joi.string().optional(),
    responsibilities: Joi.string().optional(),
    location: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    current: Joi.boolean().optional(),
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
  validateCreateExperiance,
  validateUpdateExperiance,
};
