const Setting = require('../models/setting.model');

const createSetting = async (settingData) => {
  const setting = await Setting.create(settingData);
  return setting;
};

const getSettings = async () => {
  const settings = await Setting.findAll();
  return settings;
};

const getSettingById = async (id) => {
  const setting = await Setting.findByPk(id);
  if (!setting) {
    throw new Error('Setting not found');
  }
  return setting;
};

const updateSetting = async (id, settingData) => {
  const setting = await Setting.findByPk(id);
  if (!setting) {
    throw new Error('Setting not found');
  }
  const updatedSetting = await setting.update(settingData);
  return updatedSetting;
};

const deleteSetting = async (id) => {
  const setting = await Setting.findByPk(id);
  if (!setting) {
    throw new Error('Setting not found');
  }
  await setting.destroy();
  return setting;
};

module.exports = {
  createSetting,
  getSettings,
  getSettingById,
  updateSetting,
  deleteSetting,
};
