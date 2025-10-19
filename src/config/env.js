const dotenv = require('dotenv');

dotenv.config();

const env = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DIALECT: process.env.DB_DIALECT,

  // email
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USE_TLS: process.env.EMAIL_USE_TLS,
  EMAIL_USE_SSL: process.env.EMAIL_USE_SSL,


  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,

  // Bcrypt
  SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

module.exports = env;
