const aboutService = require('../services/about.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');

const createAbout = async (req, res) => {
  try {
    // Sanitize inputs
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.bio) req.body.bio = sanitizeInput(req.body.bio, true);
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.tagline) req.body.tagline = sanitizeInput(req.body.tagline);
    
    const aboutData = req.body;
    const createdAbout = await aboutService.createAbout(aboutData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'About created successfully',
      data: createdAbout,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getAbout = async (req, res) => {
  try {
    const about = await aboutService.getAbout();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'About fetched successfully',
      data: about,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize inputs
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description, true);
    if (req.body.bio) req.body.bio = sanitizeInput(req.body.bio, true);
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.tagline) req.body.tagline = sanitizeInput(req.body.tagline);
    
    const aboutData = req.body;
    const updatedAbout = await aboutService.updateAbout(id, aboutData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'About updated successfully',
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAbout,
  getAbout,
  updateAbout,
};
