const seoService = require('../services/seo.service');
const statusCodes = require('../constants/statusCodes.constant');

const createSEO = async (req, res) => {
  try {
    const seoData = req.body;
    const createdSEO = await seoService.createSEO(seoData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'SEO created successfully',
      data: createdSEO,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getSEO = async (req, res) => {
  try {
    const seo = await seoService.getSEO();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'SEO fetched successfully',
      data: seo,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSEO = async (req, res) => {
  try {
    const { id } = req.params;
    const seoData = req.body;
    const updatedSEO = await seoService.updateSEO(id, seoData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'SEO updated successfully',
      data: updatedSEO,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSEO,
  getSEO,
  updateSEO,
};
