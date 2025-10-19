const express = require('express');
const router = express.Router();

// Import all route modules
const projectRoutes = require('./project.routes');
const skillRoutes = require('./skill.routes');
const serviceRoutes = require('./service.routes');
const FAQRoutes = require('./FAQ.routes');
const testimonialRoutes = require('./testimonial.routes');
const navbarRoutes = require('./navbar.routes');
const footerRoutes = require('./footer.routes');

router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/services', serviceRoutes);
router.use('/FAQs', FAQRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/navbar', navbarRoutes);
router.use('/footer', footerRoutes);

module.exports = router;
