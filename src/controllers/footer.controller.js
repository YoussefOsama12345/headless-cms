const footerService = require('../services/footer.service');
const statusCodes = require('../constants/statusCodes.constant');

const createFooterItem = async (req, res) => {
  try {
    const footerData = req.body;
    const createdFooterItem = await footerService.createFooterItem(footerData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Footer item created successfully',
      data: createdFooterItem,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getFooterItems = async (req, res) => {
  try {
    const footerItems = await footerService.getFooterItems();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Footer items fetched successfully',
      data: footerItems,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getFooterItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const footerItem = await footerService.getFooterItemById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Footer item fetched successfully',
      data: footerItem,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFooterItem = async (req, res) => {
  try {
    const { id } = req.params;
    const footerData = req.body;
    const updatedFooterItem = await footerService.updateFooterItem(id, footerData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Footer item updated successfully',
      data: updatedFooterItem,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFooterItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFooterItem = await footerService.deleteFooterItem(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Footer item deleted successfully',
      data: deletedFooterItem,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFooterItem,
  getFooterItems,
  getFooterItemById,
  updateFooterItem,
  deleteFooterItem,
};
