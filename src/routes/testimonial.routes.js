const express = require('express');
const testimonialController = require('../controllers/testitmonial.controller');
const {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} = require('../validators/testimonial.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', validateCreateTestimonial, testimonialController.createTestimonial);
router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonialById);
router.put('/:id', validateUpdateTestimonial, testimonialController.updateTestimonial);
router.delete('/:id',testimonialController.deleteTestimonial);

module.exports = router;
