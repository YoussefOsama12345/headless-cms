const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('project',
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

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Start date is required' },
        isDate: { msg: 'Start date must be a valid date' },
      },
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'End date is required' },
        isDate: { msg: 'End date must be a valid date' },
      },
    },

    githubLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'GitHub link is required' },
        isUrl: { msg: 'GitHub link must be a valid URL' },
      },
    },

    projectLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Project link is required' },
        isUrl: { msg: 'Project link must be a valid URL' },
      },
    },

    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Thumbnail is required' },
        isUrl: { msg: 'Thumbnail must be a valid URL' },
      },
    },

    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    technologies: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    categories: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: 'Is featured value is required' },
      },
    },
  },
  {
    timestamps: true,
    tableName: 'projects',
  }
);

module.exports = Project;
