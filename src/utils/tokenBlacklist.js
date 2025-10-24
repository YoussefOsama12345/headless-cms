const tokenBlacklist = new Set();

const revokeToken = (token) => {
  tokenBlacklist.add(token);
  // Remove token from blacklist after 24 hours
  setTimeout(() => {
    tokenBlacklist.delete(token);
  }, 24 * 60 * 60 * 1000);
};

const isTokenRevoked = (token) => {
  return tokenBlacklist.has(token);
};

const clearBlacklist = () => {
  tokenBlacklist.clear();
};

const getBlacklistSize = () => {
  return tokenBlacklist.size;
};

module.exports = {
  revokeToken,
  isTokenRevoked,
  clearBlacklist,
  getBlacklistSize
};
