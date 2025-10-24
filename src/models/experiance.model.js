const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Experiance = sequelize.define('experiance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Company is required' },
      notEmpty: { msg: 'Company cannot be empty' },
    },
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Position is required' },
      notEmpty: { msg: 'Position cannot be empty' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  responsibilities: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  current: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: 'experiances',
});

module.exports = Experiance;
