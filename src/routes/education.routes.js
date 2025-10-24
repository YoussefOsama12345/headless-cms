const express = require('express');
const educationController = require('../controllers/education.controller');
const { validateCreateEducation, validateUpdateEducation } = require('../validators/education.validator');
const { verifyToken, authorize }= require('../middleware/auth.middleware');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  authorize('admin'),
  validateCreateEducation,
  educationController.createEducation
);

router.put(
  '/:id',
  verifyToken,
  authorize('admin'),
  validateUpdateEducation,
  educationController.updateEducation
);

router.delete(
  '/:id',
  verifyToken,
  authorize('admin'),
  educationController.deleteEducation
);

router.get(
  '/',
  educationController.getEducations
);

router.get(
  '/:id',
  educationController.getEducationById
);

module.exports = router;
