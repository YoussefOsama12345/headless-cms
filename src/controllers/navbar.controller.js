const navbarService = require('../services/navbar.service');
const statusCodes = require('../constants/statusCodes.constant');

const createNavbarItem = async (req, res) => {
  try {
    const navbarData = req.body;
    const createdNavbarItem = await navbarService.createNavbarItem(navbarData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Navbar item created successfully',
      data: createdNavbarItem,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getNavbarItems = async (req, res) => {
  try {
    const navbarItems = await navbarService.getNavbarItems();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Navbar items fetched successfully',
      data: navbarItems,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getNavbarItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const navbarItem = await navbarService.getNavbarItemById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Navbar item fetched successfully',
      data: navbarItem,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNavbarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const navbarData = req.body;
    const updatedNavbarItem = await navbarService.updateNavbarItem(id, navbarData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Navbar item updated successfully',
      data: updatedNavbarItem,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNavbarItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNavbarItem = await navbarService.deleteNavbarItem(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Navbar item deleted successfully',
      data: deletedNavbarItem,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNavbarItem,
  getNavbarItems,
  getNavbarItemById,
  updateNavbarItem,
  deleteNavbarItem,
};
