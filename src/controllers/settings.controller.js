const settingService = require('../services/setting.service');
const statusCodes = require('../constants/statusCodes.constant');

const createSetting = async (req, res) => {
  try {
    const settingData = req.body;
    const createdSetting = await settingService.createSetting(settingData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Setting created successfully',
      data: createdSetting,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await settingService.getSettings();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Settings fetched successfully',
      data: settings,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getSettingById = async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await settingService.getSettingById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Setting fetched successfully',
      data: setting,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const settingData = req.body;
    const updatedSetting = await settingService.updateSetting(id, settingData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Setting updated successfully',
      data: updatedSetting,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSetting = await settingService.deleteSetting(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Setting deleted successfully',
      data: deletedSetting,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSetting,
  getSettings,
  getSettingById,
  updateSetting,
  deleteSetting,
};
