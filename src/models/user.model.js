// src/models/User.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { hashPassword } = require('../utils/hash');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required',
        },
        notEmpty: {
          args: true,
          msg: 'Name is required',
        },
        len: {
          args: [3, 50],
          msg: 'Name must be between 3 and 50 characters',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email already in use' },
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required',
        },
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
        isEmail: {
          args: true,
          msg: 'Invalid email address',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [8, 50],
          msg: 'Password must be between 8 and 50 characters'
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
          msg: 'Password must include uppercase, lowercase, number, and special character',
        },
      },
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'admin',
    },
  },
  {
    timestamps: true, // Sequelize will handle createdAt & updatedAt
    tableName: 'users',
  }
);


User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await hashPassword(user.password);
  }
});

module.exports = User;
