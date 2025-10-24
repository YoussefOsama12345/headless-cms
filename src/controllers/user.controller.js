const userService = require('../services/user.service');
const statusCodes = require('../constants/statusCodes.constant');
const { sanitizeInput } = require('../utils/sanitize');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || statusCodes.BAD_REQUEST;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    // Sanitize inputs
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);

    const userData = req.body;
    const createdUser = await userService.createUser(userData);

    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: createdUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || statusCodes.BAD_REQUEST;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Sanitize inputs
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);

    const updateData = req.body;
    const updatedUser = await userService.updateUser(id, updateData);

    return res.status(statusCodes.OK).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || statusCodes.BAD_REQUEST;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

    return res.status(statusCodes.OK).json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error) {
    const statusCode = error.statusCode || statusCodes.BAD_REQUEST;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user stats
const getUserStats = async (req, res) => {
  try {
    const stats = await userService.getUserStats();
    return res.status(statusCodes.OK).json({
      success: true,
      message: 'User stats fetched successfully',
      data: stats,
    });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
};
