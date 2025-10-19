const FAQ = require('../models/FAQ.model');

const createFAQ = async (faqData) => {
  const faq = await FAQ.create(faqData);
  return faq;
};

const getFAQs = async () => {
  const faqs = await FAQ.findAll();
  return faqs;
};

const getFAQById = async (id) => {
  const faq = await FAQ.findByPk(id);
  if (!faq) {
    throw new Error('FAQ not found');
  }
  return faq;
};

const updateFAQ = async (id, faqData) => {
  const faq = await FAQ.findByPk(id);
  const updatedFAQ = await FAQ.update(faqData, { where: { id } });
  if (!faq) {
    throw new Error('FAQ not found');
  }

  return faq;
};

const deleteFAQ = async (id) => {
  const faq = await FAQ.findByPk(id);
  const deletedFAQ = await FAQ.destroy({ where: { id } });
  if (!faq) {
    throw new Error('FAQ not found');
  }

  return faq;
};

module.exports = {
  createFAQ,
  getFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};
