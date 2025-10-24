const Education = require('../models/education.model');
const createEducation = async (educationData) => {
  const education = await Education.create(educationData);
  return education;
};
const getEducations = async () => {
  const educations = await Education.findAll();
  return educations;
};
const getEducationById = async (id) => {
  const education = await Education.findByPk(id);
  return education;
};
const updateEducation = async (id, educationData) => {
  const [affectedRows] = await Education.update(educationData, { where: { id } });
  if (affectedRows === 0) {
    throw new Error('Education not found');
  }
  const updatedEducation = await Education.findByPk(id);
  return updatedEducation;
};
const deleteEducation = async (id) => {
  const education = await Education.findByPk(id);
  const deletedRows = await Education.destroy({ where: { id } });
  if (deletedRows === 0) {
    throw new Error('Education not found');
  }
  return education;
};
module.exports = {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
