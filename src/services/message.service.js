const Message = require('../models/message.model');

const createMessage = async (messageData) => {
  const message = await Message.create(messageData);
  return message;
};

const getMessages = async () => {
  const messages = await Message.findAll();
  return messages;
};

const getMessageById = async (id) => {
  const message = await Message.findByPk(id);
  if (!message) {
    throw new Error('Message not found');
  }
  return message;
};

const updateMessage = async (id, messageData) => {
  const message = await Message.findByPk(id);
  if (!message) {
    throw new Error('Message not found');
  }
  const updatedMessage = await message.update(messageData);
  return updatedMessage;
};

const deleteMessage = async (id) => {
  const message = await Message.findByPk(id);
  if (!message) {
    throw new Error('Message not found');
  }
  await message.destroy();
  return message;
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
