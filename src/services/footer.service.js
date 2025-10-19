const Footer = require('../models/footer.model');

const createFooterItem = async (footerData) => {{}
  const footer = await Footer.create(footerData);
  return footer;
};

const getFooterItems = async () => {
  const footer = await Footer.findAll();
  return footer;
};

const getFooterItemById = async (id) => {
  const footer = await Footer.findByPk(id);
  return footer;
};

const updateFooterItem = async (id, footerData) => {
  const footer = await Footer.findByPk(id);
  if (!footer) {
    throw new Error('Footer not found');
  }
  await footer.update(footerData);
  return footer;
};

const deleteFooterItem = async (id) => {
  const footer = await Footer.findByPk(id);
  if (!footer) {
    throw new Error('Footer not found');
  }
  await footer.destroy();
  return footer;
};

module.exports = {
  createFooterItem,
  getFooterItems,
  getFooterItemById,
  updateFooterItem,
  deleteFooterItem,
};
