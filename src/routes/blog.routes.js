const express = require('express');
const blogController = require('../controllers/blog.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const { validateCreateBlog, validateUpdateBlog } = require('../validators/blog.validator');

const router = express.Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', verifyToken, authorize('admin', 'editor'),validateCreateBlog,blogController.createBlog);
router.put('/:id',verifyToken, authorize('admin', 'editor'),validateUpdateBlog,blogController.updateBlog);
router.delete('/:id',verifyToken,authorize('admin'),blogController.deleteBlog);

module.exports = router;
