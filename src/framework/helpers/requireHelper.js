const stackTrace = require('stack-trace');
const path = require('path');

/**
 * Remove cached modules for properties-regeneration and return new required module
 * @param {string} module module relative path
 * @returns {module} result of executing require to uncached module
 */
function requireUncached(module) {
  const modulePath = `${path.dirname(stackTrace.get()[1].getFileName())}/${module}`;
  delete require.cache[require.resolve(modulePath)];
  // eslint-disable-next-line import/no-dynamic-require, global-require
  return require(modulePath);
}

module.exports = {
  requireUncached,
};
