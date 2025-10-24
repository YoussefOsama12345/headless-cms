const express = require('express');
const userController = require('../controllers/user.controller');
const { validateCreateUser, validateUpdateUser } = require('../validators/user.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, authorize('admin'), userController.getUsers);
router.get('/stats', verifyToken, authorize('admin'), userController.getUserStats);
router.get('/:id', verifyToken, authorize('admin'), userController.getUserById);
router.post('/', verifyToken, authorize('admin'), validateCreateUser, userController.createUser);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateUser, userController.updateUser);
router.delete('/:id', verifyToken, authorize('admin'), userController.deleteUser);

module.exports = router;
