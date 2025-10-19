const express = require('express');
const navbarController = require('../controllers/navbar.controller');
const { validateCreateNavbar, validateUpdateNavbar } = require('../validators/navbar.validator');

const router = express.Router();

router.post('/', validateCreateNavbar, navbarController.createNavbarItem);
router.get('/', navbarController.getNavbarItems);
router.get('/:id', navbarController.getNavbarItemById);
router.put('/:id', validateUpdateNavbar, navbarController.updateNavbarItem);
router.delete('/:id', navbarController.deleteNavbarItem);

module.exports = router;
