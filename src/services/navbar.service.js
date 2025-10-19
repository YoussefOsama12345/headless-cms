const { Navbar } = require('../models');

const createNavbarItem = async (navbarData) => {
  const navbar = await Navbar.create(navbarData);
  return navbar;
}

const getNavbarItems = async () => {
  const navbar = await Navbar.findAll();
  return navbar;
}

const getNavbarItemById = async (id) => {
  const navbar = await Navbar.findByPk(id);
  return navbar;
}

const updateNavbarItem = async (id, navbarData) => {
  const [affectedRows] = await Navbar.update(navbarData, { where: { id } });

  if (affectedRows === 0) {
    throw new Error('Navbar not found');
  }

  const updatedNavbar = await Navbar.findByPk(id);
  return updatedNavbar;
}

const deleteNavbarItem = async (id) => {

  const navbar = await Navbar.findByPk(id);

  if (!navbar) {
    throw new Error('Navbar not found');
  }

  await Navbar.destroy({ where: { id } });

  return navbar;
}

module.exports = {
  createNavbarItem,
  getNavbarItems,
  getNavbarItemById,
  updateNavbarItem,
  deleteNavbarItem,
};
