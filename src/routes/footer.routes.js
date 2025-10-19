const express = require('express');
const footerController = require('../controllers/footer.controller');
const { validateCreateFooter, validateUpdateFooter } = require('../validators/footer.validator');

const router = express.Router();

router.post('/', validateCreateFooter, footerController.createFooterItem);
router.get('/', footerController.getFooterItems);
router.get('/:id', footerController.getFooterItemById);
router.put('/:id', validateUpdateFooter, footerController.updateFooterItem);
router.delete('/:id', footerController.deleteFooterItem);

module.exports = router;
