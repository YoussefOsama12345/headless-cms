const Certificate = require('../models/certificate.model');

const createCertificate = async (certificateData) => {
  const certificate = await Certificate.create(certificateData);
  return certificate;
};

const getCertificates = async () => {
  const certificates = await Certificate.findAll();
  return certificates;
};

const getCertificateById = async (id) => {
  const certificate = await Certificate.findByPk(id);
  if (!certificate) {
    throw new Error('Certificate not found');
  }
  return certificate;
};

const updateCertificate = async (id, certificateData) => {
  const certificate = await Certificate.findByPk(id);
  if (!certificate) {
    throw new Error('Certificate not found');
  }
  const updatedCertificate = await certificate.update(certificateData);
  return updatedCertificate;
};

const deleteCertificate = async (id) => {
  const certificate = await Certificate.findByPk(id);
  if (!certificate) {
    throw new Error('Certificate not found');
  }
  await certificate.destroy();
  return certificate;
};

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};
