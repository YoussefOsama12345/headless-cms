const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Skill = sequelize.define('skill', {
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
        msg: 'Name is required'
      },
      notEmpty: {
        args: true,
        msg: 'Name cannot be empty'
      },
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Icon is required'
      },
      notEmpty: {
        args: true,
        msg: 'Icon cannot be empty'
      },
    },
  },
});

module.exports = Skill;
