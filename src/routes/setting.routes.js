const express = require('express');
const settingsController = require('../controllers/settings.controller');
const { verifyToken,authorize } = require('../middleware/auth.middleware');
const { validateCreateSetting, validateUpdateSetting } = require('../validators/setting.validator');

const router = express.Router();

router.get('/', settingsController.getSettings);
router.get('/:id', settingsController.getSettingById);

router.post('/', 
  verifyToken, 
  authorize('admin'),
  validateCreateSetting,
  settingsController.createSetting
);

router.put('/:id', 
  verifyToken, 
  authorize('admin'),
  validateUpdateSetting,
  settingsController.updateSetting
);

router.delete('/:id', 
  verifyToken, 
  authorize('admin'),
  settingsController.deleteSetting
);

module.exports = router;
