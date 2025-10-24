const Blog = require('../models/blog.model');

const createBlog = async (blogData) => {
  const blog = await Blog.create(blogData);
  return blog;
};

const getBlogs = async () => {
  const blogs = await Blog.findAll();
  return blogs;
};

const getBlogById = async (id) => {
  const blog = await Blog.findByPk(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  return blog;
};

const updateBlog = async (id, blogData) => {
  const blog = await Blog.findByPk(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  const updatedBlog = await blog.update(blogData);
  return updatedBlog;
};

const deleteBlog = async (id) => {
  const blog = await Blog.findByPk(id);
  if (!blog) {
    throw new Error('Blog not found');
  }
  await blog.destroy();
  return blog;
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
