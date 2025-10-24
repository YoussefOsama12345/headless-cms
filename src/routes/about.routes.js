const express = require('express');
const aboutController = require('../controllers/about.controller');
const { verifyToken , authorize} = require('../middleware/auth.middleware');

const { validateCreateAbout, validateUpdateAbout } = require('../validators/about.validator');

const router = express.Router();

router.get('/', aboutController.getAbout);

router.post('/',
  verifyToken,
  authorize('admin'),
  validateCreateAbout,
  aboutController.createAbout
);

router.put('/:id',
  verifyToken,
  authorize('admin'),
  validateUpdateAbout,
  aboutController.updateAbout
);

module.exports = router;
