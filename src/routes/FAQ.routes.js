const express = require('express');
const FAQController = require('../controllers/FAQ.controller');
const {
  validateCreateFAQ,
  validateUpdateFAQ,
} = require('../validators/FAQ.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateFAQ, FAQController.createFAQ);
router.get('/', FAQController.getFAQs);
router.get('/:id', FAQController.getFAQById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateFAQ, FAQController.updateFAQ);
router.delete('/:id', verifyToken, authorize('admin'), FAQController.deleteFAQ);

module.exports = router;
