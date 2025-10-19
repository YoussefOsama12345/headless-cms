const Service = require('../models/service.model');

const createService = async (serviceData) => {
  const service = await Service.create(serviceData);
  return service;
};

const getServices = async () => {
  const services = await Service.findAll();
  return services;
};

const getServiceById = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

const updateService = async (id, serviceData) => {
  const updatedService = await Service.findByPk(id);
  const [affectedRows] = await Service.update(serviceData, { where: { id } });
  if (affectedRows === 0) {
    throw new Error('Service not found');
  }

  return updatedService;
};

const deleteService = async (id) => {
  const deletedService = await Service.findByPk(id);
  const deletedRows = await Service.destroy({ where: { id } });
  if (deletedRows === 0) {
    throw new Error('Service not found');
  }

  return deletedService;
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
