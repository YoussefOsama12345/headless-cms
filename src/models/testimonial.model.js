const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Testimonial = sequelize.define('testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Name is required'
      },
      notEmpty: {
        args: true,
        msg: 'Name cannot be empty' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      },
    },
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Message is required'
      },
      notEmpty: {
        args: true,
        msg: 'Message cannot be empty'
      },
      len: { args: [10, 1000], msg: 'Message must be at least 10 characters long' },
    },
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Image is required' },
      notEmpty: { msg: 'Image cannot be empty' },
      isUrl: { msg: 'Image must be a valid URL' },
    },
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Rating is required' },
      notEmpty: {
        args: true,
        msg: 'Rating cannot be empty' },
      min: {
        args: [1],
        msg: 'Rating must be at least 1' },
      max: {
        args: [5],
        msg: 'Rating cannot exceed 5' },
      isInt: {
        args: true,
        msg: 'Rating must be an integer' },
    },
  },

  position: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

module.exports = Testimonial;
