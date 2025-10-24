const express = require('express');
const projectController = require('../controllers/project.controller');
const { validateCreateProject,validateUpdateProject } = require('../validators/project.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateProject, projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateProject, projectController.updateProject);
router.delete('/:id', verifyToken, authorize('admin'), projectController.deleteProject);

module.exports = router;
