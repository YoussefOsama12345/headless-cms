const express = require('express');
const projectController = require('../controllers/project.controller');
const { validateCreateProject,validateUpdateProject } = require('../validators/project.validator');

const router = express.Router();

router.post('/', validateCreateProject, projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', validateUpdateProject, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
