const sanitizeHtml = require('sanitize-html');
const sanitizeInput = (input, allowBasicHtml = false) => {
  if (typeof input !== 'string') {
    return input;
  }
  if (allowBasicHtml) {
    return sanitizeHtml(input, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      allowedAttributes: {
        'a': ['href', 'title', 'target']
      },
      allowedSchemes: ['http', 'https', 'mailto']
    });
  }
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};
const sanitizeObject = (obj, fieldsToSanitize = [], allowBasicHtml = false) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const sanitized = { ...obj };
  fieldsToSanitize.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = sanitizeInput(sanitized[field], allowBasicHtml);
    }
  });
  return sanitized;
};
module.exports = {
  sanitizeInput,
  sanitizeObject
};
