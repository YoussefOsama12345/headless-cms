const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const projectRoutes = require('./project.routes');
const skillRoutes = require('./skill.routes');
const serviceRoutes = require('./service.routes');
const faqRoutes = require('./FAQ.routes');
const testimonialRoutes = require('./testimonial.routes');
const navbarRoutes = require('./navbar.routes');
const footerRoutes = require('./footer.routes');
const aboutRoutes = require('./about.routes');
const blogRoutes = require('./blog.routes');
const certificateRoutes = require('./certificate.routes');
const experianceRoutes = require('./experiance.routes');
const educationRoutes = require('./education.routes');
const messageRoutes = require('./message.routes');
const settingRoutes = require('./setting.routes');
const seoRoutes = require('./seo.routes');

// Register all route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/about', aboutRoutes);
router.use('/blog', blogRoutes);
router.use('/certificate', certificateRoutes);
router.use('/experiance', experianceRoutes);
router.use('/education', educationRoutes);
router.use('/message', messageRoutes);
router.use('/setting', settingRoutes);
router.use('/seo', seoRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/services', serviceRoutes);
router.use('/faq', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/navbar', navbarRoutes);
router.use('/footer', footerRoutes);

module.exports = router;
