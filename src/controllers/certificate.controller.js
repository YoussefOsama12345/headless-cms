const certificateService = require('../services/certificate.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');

const createCertificate = async (req, res) => {
  try {
    // Sanitize inputs
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.issuer) req.body.issuer = sanitizeInput(req.body.issuer);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description);
    if (req.body.credentialUrl) req.body.credentialUrl = sanitizeInput(req.body.credentialUrl);
    if (req.body.credentialId) req.body.credentialId = sanitizeInput(req.body.credentialId);
    
    const certificateData = req.body;
    const createdCertificate = await certificateService.createCertificate(certificateData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Certificate created successfully',
      data: createdCertificate,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getCertificates = async (req, res) => {
  try {
    const certificates = await certificateService.getCertificates();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Certificates fetched successfully',
      data: certificates,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await certificateService.getCertificateById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Certificate fetched successfully',
      data: certificate,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize inputs
    if (req.body.title) req.body.title = sanitizeInput(req.body.title);
    if (req.body.issuer) req.body.issuer = sanitizeInput(req.body.issuer);
    if (req.body.description) req.body.description = sanitizeInput(req.body.description);
    if (req.body.credentialUrl) req.body.credentialUrl = sanitizeInput(req.body.credentialUrl);
    if (req.body.credentialId) req.body.credentialId = sanitizeInput(req.body.credentialId);
    
    const certificateData = req.body;
    const updatedCertificate = await certificateService.updateCertificate(id, certificateData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Certificate updated successfully',
      data: updatedCertificate,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCertificate = await certificateService.deleteCertificate(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Certificate deleted successfully',
      data: deletedCertificate,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
};
