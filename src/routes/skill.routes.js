const express = require('express');
const skillController = require('../controllers/skill.controller');
const {
  validateCreateSkill,
  validateUpdateSkill,
} = require('../validators/skill.validator');

const router = express.Router();

router.post('/', validateCreateSkill, skillController.createSkill);
router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);
router.put('/:id', validateUpdateSkill, skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
