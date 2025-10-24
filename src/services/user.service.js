const { User } = require('../models');
const { hashPassword } = require('../utils/hash');
const AppError = require('../utils/appError');

// Get all users
const getUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password', 'emailVerificationOtp', 'resetPasswordOtp', 'refreshToken']
    },
    order: [['createdAt', 'DESC']]
  });
  return users;
};

// Get user by ID
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password', 'emailVerificationOtp', 'resetPasswordOtp', 'refreshToken']
    }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

// Create user
const createUser = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new AppError('User with this email already exists', 409);
  }

  // Create new user
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    emailVerified: userData.emailVerified || false,
    isActive: userData.isActive !== undefined ? userData.isActive : true,
    provider: userData.provider || 'local',
  });

  // Return user without sensitive fields
  const userObj = user.toJSON();
  delete userObj.password;
  delete userObj.emailVerificationOtp;
  delete userObj.resetPasswordOtp;
  delete userObj.refreshToken;

  return userObj;
};

// Update user
const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Don't allow updating sensitive fields via this endpoint
  const { password, emailVerificationOtp, resetPasswordOtp, refreshToken, provider, ...allowedUpdates } = updateData;

  // Hash password if it's being updated
  if (updateData.password) {
    allowedUpdates.password = await hashPassword(updateData.password);
  }

  // Update user
  await user.update(allowedUpdates);

  // Fetch updated user
  const updatedUser = await User.findByPk(id, {
    attributes: {
      exclude: ['password', 'emailVerificationOtp', 'resetPasswordOtp', 'refreshToken']
    }
  });

  return updatedUser;
};

// Delete user
const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Soft delete
  await user.destroy();

  return { message: 'User deleted successfully', userId: id };
};

// Get user stats
const getUserStats = async () => {
  const totalUsers = await User.count();
  const activeUsers = await User.count({ where: { isActive: true } });
  const adminUsers = await User.count({ where: { role: 'admin' } });
  const editorUsers = await User.count({ where: { role: 'editor' } });

  return {
    totalUsers,
    activeUsers,
    adminUsers,
    editorUsers,
  };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
};
