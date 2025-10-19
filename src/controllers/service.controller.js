const serviceService = require('../services/services.service');
const statusCodes = require('../constants/statusCodes.constant');

const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const createdService = await serviceService.createService(serviceData);

    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Service created successfully',
      data: createdService,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Services fetched successfully',
      data: services,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Service fetched successfully',
      data: service,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceData = req.body;
    const updatedService = await serviceService.updateService(id, serviceData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await serviceService.deleteService(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Service deleted successfully',
      data: deletedService,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
