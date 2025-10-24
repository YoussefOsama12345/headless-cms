const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SEO = sequelize.define('seo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Title is required' },
      notEmpty: { msg: 'Title cannot be empty' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ogTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ogDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ogImage: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'OG Image must be a valid URL' },
    },
  },
  twitterCard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'seo',
});

module.exports = SEO;
