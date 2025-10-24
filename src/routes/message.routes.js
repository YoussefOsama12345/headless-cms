const express = require('express');
const messageController = require('../controllers/message.controller');
const { verifyToken,authorize } = require('../middleware/auth.middleware');
const { validateCreateMessage, validateUpdateMessage } = require('../validators/message.validator');

const router = express.Router();

router.post('/', validateCreateMessage, messageController.createMessage);

router.get('/',
  verifyToken,
  authorize('admin'),
  messageController.getMessages
);

router.get('/:id',
  verifyToken,
  authorize('admin'),
  messageController.getMessageById
);

router.put('/:id',
  verifyToken,
  authorize('admin'),
  validateUpdateMessage,
  messageController.updateMessage
);

router.delete('/:id',
  verifyToken,
  authorize('admin'),
  messageController.deleteMessage
);

module.exports = router;
