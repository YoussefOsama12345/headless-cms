const express = require('express');
const experianceController = require('../controllers/experiance.controller');
const { verifyToken,authorize } = require('../middleware/auth.middleware');
const { validateCreateExperiance, validateUpdateExperiance } = require('../validators/experiance.validator');

const router = express.Router();

router.get('/', experianceController.getExperiances);
router.get('/:id', experianceController.getExperianceById);

router.post('/', 
  verifyToken, 
  authorize('admin', 'editor'),
  validateCreateExperiance,
  experianceController.createExperiance
);

router.put('/:id', 
  verifyToken, 
  authorize('admin', 'editor'),
  validateUpdateExperiance,
  experianceController.updateExperiance
);

router.delete('/:id', 
  verifyToken, 
  authorize('admin'),
  experianceController.deleteExperiance
);

module.exports = router;
