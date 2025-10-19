const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Footer = sequelize.define('footer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Section title is required'
      },
      notEmpty: {
        args: true,
        msg: 'Section title cannot be empty'
      },
      len: {
        args: [2, 100],
        msg: 'Section title must be between 2 and 100 characters'
      },
    },
  },

  linkTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Link title is required'
      },
      notEmpty: {
        args: true,
        msg: 'Link title cannot be empty'
      },
      len: {
        args: [1, 50],
        msg: 'Link title must be between 1 and 50 characters'
      },
    },
  },

  linkUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Link URL is required'
      },
      notEmpty: {
        args: true, msg: 'Link URL cannot be empty' },
        isUrl: { args: true, msg: 'Link must be a valid URL'
      },
    },
  },

  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [0, 100],
        msg: 'Icon name cannot exceed 100 characters'
      },
    },
  },

  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = Footer;
