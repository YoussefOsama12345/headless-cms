const FAQService = require('../services/FAQ.service');
const statusCodes = require('../constants/statusCodes.constant');

const createFAQ = async (req, res) => {
  try {
    const faqData = req.body;
    const createdFAQ = await FAQService.createFAQ(faqData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'FAQ created successfully',
      data: createdFAQ,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQService.getFAQs();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'FAQs fetched successfully',
      data: faqs,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getFAQById = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQService.getFAQById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'FAQ fetched successfully',
      data: faq,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faqData = req.body;
    const updatedFAQ = await FAQService.updateFAQ(id, faqData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'FAQ updated successfully',
      data: updatedFAQ,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFAQ = await FAQService.deleteFAQ(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'FAQ deleted successfully',
      data: deletedFAQ,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFAQ,
  getFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
