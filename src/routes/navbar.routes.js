const express = require('express');
const navbarController = require('../controllers/navbar.controller');
const { validateCreateNavbar, validateUpdateNavbar } = require('../validators/navbar.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateNavbar, navbarController.createNavbarItem);
router.get('/', navbarController.getNavbarItems);
router.get('/:id', navbarController.getNavbarItemById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateNavbar, navbarController.updateNavbarItem);
router.delete('/:id', verifyToken, authorize('admin'), navbarController.deleteNavbarItem);

module.exports = router;
