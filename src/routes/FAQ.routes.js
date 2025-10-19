const express = require('express');
const FAQController = require('../controllers/FAQ.controller');
const {
  validateCreateFAQ,
  validateUpdateFAQ,
} = require('../validators/FAQ.validator');

const router = express.Router();

router.post('/', validateCreateFAQ, FAQController.createFAQ);
router.get('/', FAQController.getFAQs);
router.get('/:id', FAQController.getFAQById);
router.put('/:id', validateUpdateFAQ, FAQController.updateFAQ);
router.delete('/:id', FAQController.deleteFAQ);

module.exports = router;
