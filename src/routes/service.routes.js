const express = require('express');
const serviceController = require('../controllers/service.controller');
const {
  validateCreateService,
  validateUpdateService,
} = require('../validators/service.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateService, serviceController.createService);
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateService, serviceController.updateService);
router.delete('/:id', verifyToken, authorize('admin'), serviceController.deleteService);

module.exports = router;
