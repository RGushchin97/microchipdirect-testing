/**
 * Class for receiving variable from environment and config
 */
class ConfigHelper {
  /**
     * Creating instance of ConfigHelper
     * @param {Object} config object with configuration properties
     */
  constructor(config) {
    this.config = config;
  }

  /**
     * Get variable. If variable absent in environment variables, then value from config will be returned
     * @param {string} variableName name of variable
     * @returns {string|*|boolean} variable value
     */
  getVariable(variableName) {
    return process.env[variableName] || this.config[variableName];
  }
}

module.exports = ConfigHelper;
