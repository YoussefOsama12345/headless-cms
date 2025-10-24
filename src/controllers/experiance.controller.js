const experianceService = require('../services/experiance.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');

const createExperiance = async (req, res) => {
  try {
    // Sanitize inputs
    if (req.body.company) req.body.company = sanitizeInput(req.body.company);
    if (req.body.position) req.body.position = sanitizeInput(req.body.position);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.location) req.body.location = sanitizeInput(req.body.location);
    if (req.body.responsibilities) req.body.responsibilities = sanitizeInput(req.body.responsibilities, true);
    
    const experianceData = req.body;
    const createdExperiance = await experianceService.createExperiance(experianceData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Experiance created successfully',
      data: createdExperiance,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getExperiances = async (req, res) => {
  try {
    const experiances = await experianceService.getExperiances();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Experiances fetched successfully',
      data: experiances,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getExperianceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experiance = await experianceService.getExperianceById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Experiance fetched successfully',
      data: experiance,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateExperiance = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize inputs
    if (req.body.company) req.body.company = sanitizeInput(req.body.company);
    if (req.body.position) req.body.position = sanitizeInput(req.body.position);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.location) req.body.location = sanitizeInput(req.body.location);
    if (req.body.responsibilities) req.body.responsibilities = sanitizeInput(req.body.responsibilities, true);
    
    const experianceData = req.body;
    const updatedExperiance = await experianceService.updateExperiance(id, experianceData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Experiance updated successfully',
      data: updatedExperiance,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteExperiance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExperiance = await experianceService.deleteExperiance(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Experiance deleted successfully',
      data: deletedExperiance,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createExperiance,
  getExperiances,
  getExperianceById,
  updateExperiance,
  deleteExperiance,
};
