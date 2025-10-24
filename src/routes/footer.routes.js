const express = require('express');
const footerController = require('../controllers/footer.controller');
const { validateCreateFooter, validateUpdateFooter } = require('../validators/footer.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateFooter, footerController.createFooterItem);
router.get('/', footerController.getFooterItems);
router.get('/:id', footerController.getFooterItemById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateFooter, footerController.updateFooterItem);
router.delete('/:id', verifyToken, authorize('admin'), footerController.deleteFooterItem);

module.exports = router;
