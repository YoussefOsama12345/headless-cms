const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Navbar = sequelize.define('navbar', {
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
        msg: 'Name is required' },
      notEmpty: {
        args: true,
        msg: 'Name cannot be empty' },
    },
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'Link is required' },
      notEmpty: {
        args: true,
        msg: 'Link cannot be empty' },
      isUrl: {
        args: true,
        msg: 'Link must be a valid URL' },
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}

);

module.exports = Navbar;
