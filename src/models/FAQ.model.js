const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FAQ = sequelize.define('faq', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Answer is required' },
      notEmpty: {
        args: true,
        msg: 'Answer cannot be empty' },
      notEmpty: {
        args: true,
        msg: 'Answer cannot be empty' },
      len: {
        args: [10, 1000],
        msg: 'Answer must be between 10 and 1000 characters' },
    },
  },
});

module.exports = FAQ;
