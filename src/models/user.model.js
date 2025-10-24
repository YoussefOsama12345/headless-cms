const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { hashPassword } = require('../utils/hash');

const User = sequelize.define(
  'user',
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
        notNull: {
          args: true,
          msg: 'Name is required',
        },
        notEmpty: {
          args: true,
          msg: 'Name is required',
        },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email already in use' },
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required',
        },
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
        isEmail: {
          args: true,
          msg: 'Invalid email address',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null for social auth users
      validate: {
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 characters'
        }
      },
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['admin', 'editor', 'user']],
          msg: 'Role must be admin, editor, or user',
        },
      },
    },

    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    emailVerificationOtp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emailVerificationOtpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    resetPasswordOtp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Social Authentication Fields
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    linkedinId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    provider: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['local', 'google', 'facebook', 'github', 'linkedin']],
          msg: 'Provider must be email, google, facebook, github, or linkedin'
        },
      },
    },

    // Token Management
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    refreshTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastLogout: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'users',
    paranoid: true, // Enable soft delete
  }
);

// Hash password before creating user
User.beforeCreate(async (user) => {
  // Only hash password if it exists (social auth users might not have passwords)
  if (user.password) {
    user.password = await hashPassword(user.password);
  }
});

// Hash password before updating user
User.beforeUpdate(async (user) => {
  // Only hash password if it changed and exists
  if (user.changed('password') && user.password) {
    user.password = await hashPassword(user.password);
  }
});

module.exports = User;
