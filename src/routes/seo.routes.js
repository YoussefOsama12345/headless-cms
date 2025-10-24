const express = require('express');
const seoController = require('../controllers/seo.controller');
const { verifyToken,authorize } = require('../middleware/auth.middleware');
const { validateCreateSEO, validateUpdateSEO } = require('../validators/seo.validator');

const router = express.Router();

router.get('/', seoController.getSEO);

router.post('/',
  verifyToken,
  authorize('admin'),
  validateCreateSEO,
  seoController.createSEO
);

router.put('/:id',
  verifyToken,
  authorize('admin'),
  validateUpdateSEO,
  seoController.updateSEO
);

module.exports = router;
