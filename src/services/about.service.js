const About = require('../models/about.model');

const createAbout = async (aboutData) => {
  const about = await About.create(aboutData);
  return about;
};

const getAbout = async () => {
  const about = await About.findOne();
  return about;
};

const updateAbout = async (id, aboutData) => {
  const about = await About.findByPk(id);
  if (!about) {
    throw new Error('About not found');
  }
  const updatedAbout = await about.update(aboutData);
  return updatedAbout;
};

module.exports = {
  createAbout,
  getAbout,
  updateAbout,
};
