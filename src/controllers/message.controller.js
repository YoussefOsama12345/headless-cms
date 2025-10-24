const messageService = require('../services/message.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');

const createMessage = async (req, res) => {
  try {
    // Sanitize inputs to prevent XSS attacks (CRITICAL for contact forms)
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);
    if (req.body.subject) req.body.subject = sanitizeInput(req.body.subject);
    if (req.body.message) req.body.message = sanitizeInput(req.body.message);
    if (req.body.phone) req.body.phone = sanitizeInput(req.body.phone);
    
    const messageData = req.body;
    const createdMessage = await messageService.createMessage(messageData);
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Message created successfully',
      data: createdMessage,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await messageService.getMessages();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageService.getMessageById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Message fetched successfully',
      data: message,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanitize inputs
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);
    if (req.body.subject) req.body.subject = sanitizeInput(req.body.subject);
    if (req.body.message) req.body.message = sanitizeInput(req.body.message);
    if (req.body.phone) req.body.phone = sanitizeInput(req.body.phone);
    
    const messageData = req.body;
    const updatedMessage = await messageService.updateMessage(id, messageData);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Message updated successfully',
      data: updatedMessage,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await messageService.deleteMessage(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Message deleted successfully',
      data: deletedMessage,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
