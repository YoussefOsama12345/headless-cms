const express = require('express');
const serviceController = require('../controllers/service.controller');
const {
  validateCreateService,
  validateUpdateService,
} = require('../validators/service.validator');

const router = express.Router();

router.post('/', validateCreateService, serviceController.createService);
router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', validateUpdateService, serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
