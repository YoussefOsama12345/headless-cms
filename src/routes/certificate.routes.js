const express = require('express');
const certificateController = require('../controllers/certificate.controller');
const { verifyToken,authorize } = require('../middleware/auth.middleware');
const { validateCreateCertificate, validateUpdateCertificate } = require('../validators/certificate.validator');

const router = express.Router();

router.get('/', certificateController.getCertificates);
router.get('/:id', certificateController.getCertificateById);

router.post('/',
  verifyToken,
  authorize('admin'),
  validateCreateCertificate,
  certificateController.createCertificate
);

router.put('/:id',
  verifyToken,
  authorize('admin'),
  validateUpdateCertificate,
  certificateController.updateCertificate
);

router.delete('/:id',
  verifyToken,
  authorize('admin'),
  certificateController.deleteCertificate
);

module.exports = router;
