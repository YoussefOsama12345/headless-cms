const projectService = require('../services/project.service');
const statusCodes = require('../constants/statusCodes.constant');

const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const createdProject = await projectService.createProject(projectData);

    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Project created successfully',
      data: createdProject,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST || 500).json({
      success: false,
      message: error.message || 'Failed to create project',
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getProjects();

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Failed to fetch projects',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Project fetched successfully',
      data: project,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message || 'Project not found',
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const updatedProject = await projectService.updateProject(id, projectData);

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST || 500).json({
      success: false,
      message: error.message || 'Failed to update project',
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectService.deleteProject(id);

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject,
    });
  } catch (error) {
    return res.status(statusCodes.NOT_FOUND).json({
      success: false,
      message: error.message || 'Failed to delete project',
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
