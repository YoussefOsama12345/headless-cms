const testimonialService = require('../services/testitmonial.service');
const statusCodes = require('../constants/statusCodes.constant');

const createTestimonial = async (req, res) => {
  try {
    const testimonialData = req.body;
    const createdTestimonial = await testimonialService.createTestimonial(testimonialData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Testimonial created successfully',
      data: createdTestimonial,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getTestimonials();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialService.getTestimonialById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Testimonial fetched successfully',
      data: testimonial,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonialData = req.body;
    const updatedTestimonial = await testimonialService.updateTestimonial(id, testimonialData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: updatedTestimonial,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await testimonialService.deleteTestimonial(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: deletedTestimonial,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
