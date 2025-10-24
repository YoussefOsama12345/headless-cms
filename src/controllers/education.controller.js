const educationService = require('../services/education.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');
const createEducation = async (req, res) => {
  try {
    if (req.body.institution) req.body.institution = sanitizeInput(req.body.institution);
    if (req.body.degree) req.body.degree = sanitizeInput(req.body.degree);
    if (req.body.field) req.body.field = sanitizeInput(req.body.field);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.location) req.body.location = sanitizeInput(req.body.location);
    const educationData = req.body;
    const createdEducation = await educationService.createEducation(educationData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Education created successfully',
      data: createdEducation,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
const getEducations = async (req, res) => {
  try {
    const educations = await educationService.getEducations();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Educations fetched successfully',
      data: educations,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await educationService.getEducationById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Education fetched successfully',
      data: education,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.institution) req.body.institution = sanitizeInput(req.body.institution);
    if (req.body.degree) req.body.degree = sanitizeInput(req.body.degree);
    if (req.body.field) req.body.field = sanitizeInput(req.body.field);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.location) req.body.location = sanitizeInput(req.body.location);
    const educationData = req.body;
    const updatedEducation = await educationService.updateEducation(id, educationData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Education updated successfully',
      data: updatedEducation,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEducation = await educationService.deleteEducation(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Education deleted successfully',
      data: deletedEducation,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
};
