const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Education = sequelize.define('education', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Institution is required' },
      notEmpty: { msg: 'Institution cannot be empty' },
    },
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Degree is required' },
      notEmpty: { msg: 'Degree cannot be empty' },
    },
  },
  field: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
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
  tableName: 'education',
});

module.exports = Education;
