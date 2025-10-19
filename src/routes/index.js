const express = require('express');
const router = express.Router();

// Import all route modules
const projectRoutes = require('./project.routes');
const skillRoutes = require('./skill.routes');
const serviceRoutes = require('./service.routes');
const FAQRoutes = require('./FAQ.routes');
const testimonialRoutes = require('./testimonial.routes');

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/services', serviceRoutes);
router.use('/FAQs', FAQRoutes);
router.use('/testimonials', testimonialRoutes);

module.exports = router;
