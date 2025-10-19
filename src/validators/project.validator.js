const Joi = require('joi');

// Common validation rules
const commonRules = {
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 2000 characters',
      'any.required': 'Description is required',
    }),

  startDate: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.format': 'Start date must be in ISO format (YYYY-MM-DD)',
      'any.required': 'Start date is required',
    }),

  endDate: Joi.date()
    .iso()
    .greater(Joi.ref('startDate'))
    .required()
    .messages({
      'date.base': 'End date must be a valid date',
      'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
      'date.greater': 'End date must be after start date',
      'any.required': 'End date is required',
    }),

  githubLink: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.base': 'GitHub link must be a string',
      'string.empty': 'GitHub link cannot be empty',
      'string.uri': 'GitHub link must be a valid URL',
      'any.required': 'GitHub link is required',
    }),

  projectLink: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.base': 'Project link must be a string',
      'string.empty': 'Project link cannot be empty',
      'string.uri': 'Project link must be a valid URL',
      'any.required': 'Project link is required',
    }),

  thumbnail: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.base': 'Thumbnail must be a string',
      'string.empty': 'Thumbnail cannot be empty',
      'string.uri': 'Thumbnail must be a valid URL',
      'any.required': 'Thumbnail is required',
    }),

  images: Joi.array()
    .items(Joi.string().uri({ scheme: ['http', 'https'] }))
    .optional()
    .messages({
      'array.base': 'Images must be an array',
      'string.uri': 'Each image must be a valid URL',
    }),

  technologies: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .optional()
    .messages({
      'array.base': 'Technologies must be an array',
      'string.empty': 'Technology name cannot be empty',
      'string.min': 'Technology name must be at least 1 character',
      'string.max': 'Technology name cannot exceed 50 characters',
    }),

  categories: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .optional()
    .messages({
      'array.base': 'Categories must be an array',
      'string.empty': 'Category name cannot be empty',
      'string.min': 'Category name must be at least 1 character',
      'string.max': 'Category name cannot exceed 50 characters',
    }),

  tags: Joi.array()
    .items(Joi.string().trim().min(1).max(30))
    .optional()
    .messages({
      'array.base': 'Tags must be an array',
      'string.empty': 'Tag cannot be empty',
      'string.min': 'Tag must be at least 1 character',
      'string.max': 'Tag cannot exceed 30 characters',
    }),

  isFeatured: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Is featured must be a boolean value',
    }),
};

// Create Project Schema
const createProjectSchema = Joi.object({
  name: commonRules.name,
  description: commonRules.description,
  startDate: commonRules.startDate,
  endDate: commonRules.endDate,
  githubLink: commonRules.githubLink,
  projectLink: commonRules.projectLink,
  thumbnail: commonRules.thumbnail,
  images: commonRules.images,
  technologies: commonRules.technologies,
  categories: commonRules.categories,
  tags: commonRules.tags,
  isFeatured: commonRules.isFeatured,
});


const updateProjectSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 100 characters',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 2000 characters',
    }),

  startDate: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.format': 'Start date must be in ISO format (YYYY-MM-DD)',
    }),

  endDate: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'End date must be a valid date',
      'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
    }),

  githubLink: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .messages({
      'string.base': 'GitHub link must be a string',
      'string.empty': 'GitHub link cannot be empty',
      'string.uri': 'GitHub link must be a valid URL',
    }),

  projectLink: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .messages({
      'string.base': 'Project link must be a string',
      'string.empty': 'Project link cannot be empty',
      'string.uri': 'Project link must be a valid URL',
    }),

  thumbnail: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .messages({
      'string.base': 'Thumbnail must be a string',
      'string.empty': 'Thumbnail cannot be empty',
      'string.uri': 'Thumbnail must be a valid URL',
    }),

  images: commonRules.images,
  technologies: commonRules.technologies,
  categories: commonRules.categories,
  tags: commonRules.tags,
  isFeatured: commonRules.isFeatured,
});

// Validation middleware
const validateCreateProject = (req, res, next) => {
  const { error, value } = createProjectSchema.validate(req.body, {
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

const validateUpdateProject = (req, res, next) => {
  const { error, value } = updateProjectSchema.validate(req.body, {
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
  createProjectSchema,
  updateProjectSchema,
  validateCreateProject,
  validateUpdateProject,
};

