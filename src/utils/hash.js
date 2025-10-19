const bcrypt = require('bcrypt');
const env = require('../config/env');

const SALT_ROUNDS = env.SALT_ROUNDS;

async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new TypeError('Password must be a non-empty string');
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePassword(password, hash) {
  if (!password || typeof password !== 'string') return false;
  if (!hash || typeof hash !== 'string') return false;
  return bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
  SALT_ROUNDS,
};
