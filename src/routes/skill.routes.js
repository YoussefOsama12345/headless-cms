const express = require('express');
const skillController = require('../controllers/skill.controller');
const {
  validateCreateSkill,
  validateUpdateSkill,
} = require('../validators/skill.validator');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, authorize('admin'), validateCreateSkill, skillController.createSkill);
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);
router.put('/:id', verifyToken, authorize('admin'), validateUpdateSkill, skillController.updateSkill);
router.delete('/:id', verifyToken, authorize('admin'), skillController.deleteSkill);

module.exports = router;
