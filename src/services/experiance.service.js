const Experiance = require('../models/experiance.model');

const createExperiance = async (experianceData) => {
  const experiance = await Experiance.create(experianceData);
  return experiance;
};

const getExperiances = async () => {
  const experiances = await Experiance.findAll();
  return experiances;
};

const getExperianceById = async (id) => {
  const experiance = await Experiance.findByPk(id);
  if (!experiance) {
    throw new Error('Experiance not found');
  }
  return experiance;
};

const updateExperiance = async (id, experianceData) => {
  const experiance = await Experiance.findByPk(id);
  if (!experiance) {
    throw new Error('Experiance not found');
  }
  const updatedExperiance = await experiance.update(experianceData);
  return updatedExperiance;
};

const deleteExperiance = async (id) => {
  const experiance = await Experiance.findByPk(id);
  if (!experiance) {
    throw new Error('Experiance not found');
  }
  await experiance.destroy();
  return experiance;
};

module.exports = {
  createExperiance,
  getExperiances,
  getExperianceById,
  updateExperiance,
  deleteExperiance,
};
