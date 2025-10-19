const Testimonial = require('../models/testimonial.model');

const createTestimonial = async (testimonialData) => {
  const testimonial = await Testimonial.create(testimonialData);
  return testimonial;
};

const getTestimonials = async () => {
  const testimonials = await Testimonial.findAll();
  return testimonials;
};

const getTestimonialById = async (id) => {
  const testimonial = await Testimonial.findByPk(id);
  return testimonial;
};

const updateTestimonial = async (id, testimonialData) => {
  const testimonial = await Testimonial.findByPk(id);
  const updatedTestimonial = await testimonial.update(testimonialData);

  if (!testimonial) {
    throw new Error('Testimonial not found');
  }

  return testimonial;
};

const deleteTestimonial = async (id) => {
  const deletedTestimonial = await Testimonial.findByPk(id);
  const deletedRows = await Testimonial.destroy({ where: { id } });
  if (deletedRows === 0) {
    throw new Error('Testimonial not found');
  }

  return deletedTestimonial;
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
