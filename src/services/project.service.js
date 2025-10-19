const Project = require('../models/Project.model');

const createProject = async (projectData) => {
  const project = await Project.create(projectData);
  return project;
};

const getProjects = async () => {
  const projects = await Project.findAll();
  if (!projects) {
    throw new Error('Projects not found');
  }
  return projects;
};

const getProjectById = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const updateProject = async (id, projectData) => {
  const [affectedRows] = await Project.update(projectData, { where: { id } });

  if (affectedRows === 0) {
    throw new Error('Project not found');
  }

  const updatedProject = await Project.findByPk(id);
  return updatedProject;
};

const deleteProject = async (id) => {
  const deletedProject = await Project.findByPk(id);
  const deletedRows = await Project.destroy({ where: { id } });

  if (deletedRows === 0) {
    throw new Error('Project not found');
  }


  return deletedProject;
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
