const SEO = require('../models/seo.model');

const createSEO = async (seoData) => {
  const seo = await SEO.create(seoData);
  return seo;
};

const getSEO = async () => {
  const seo = await SEO.findOne();
  return seo;
};

const updateSEO = async (id, seoData) => {
  const seo = await SEO.findByPk(id);
  if (!seo) {
    throw new Error('SEO not found');
  }
  const updatedSEO = await seo.update(seoData);
  return updatedSEO;
};

module.exports = {
  createSEO,
  getSEO,
  updateSEO,
};
