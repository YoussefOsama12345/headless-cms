const Category = require('../models/category.model');

const createCategory = async (categoryData) => {
  const category = await Category.create(categoryData);
  return category;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

const updateCategory = async (id, categoryData) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Category not found');
  }
  const updatedCategory = await category.update(categoryData);
  return updatedCategory;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Category not found');
  }
  await category.destroy();
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
