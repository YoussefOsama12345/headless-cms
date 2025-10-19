const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Service = sequelize.define('service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Name is required' },
      notEmpty: { msg: 'Name cannot be empty' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Description is required' },
      notEmpty: { msg: 'Description cannot be empty' },
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Icon is required' },
      notEmpty: { msg: 'Icon cannot be empty' },
    },
  },
});

module.exports = Service;
