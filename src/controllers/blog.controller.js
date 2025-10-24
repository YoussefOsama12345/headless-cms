const blogService = require('../services/blog.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');
const { logDataAccess } = require('../utils/auditLogger');

const createBlog = async (req, res) => {
  try {
    // Sanitize inputs to prevent XSS attacks
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description);
    if (req.body.content) req.body.content = sanitizeInput(req.body.content, true); // Allow basic HTML
    if (req.body.author) req.body.author = sanitizeInput(req.body.author);
    if (req.body.tags) req.body.tags = sanitizeInput(req.body.tags);
    
    const blogData = req.body;
    const createdBlog = await blogService.createBlog(blogData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Blog created successfully',
      data: createdBlog,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Blog fetched successfully',
      data: blog,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize inputs to prevent XSS attacks
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description);
    if (req.body.content) req.body.content = sanitizeInput(req.body.content, true); // Allow basic HTML
    if (req.body.author) req.body.author = sanitizeInput(req.body.author);
    if (req.body.tags) req.body.tags = sanitizeInput(req.body.tags);
    
    const blogData = req.body;
    const updatedBlog = await blogService.updateBlog(id, blogData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await blogService.deleteBlog(id);
    
    // Log blog deletion
    logDataAccess.delete(req.user.id, 'blog', id);
    
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Blog deleted successfully',
      data: deletedBlog,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
