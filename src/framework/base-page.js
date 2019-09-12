const { transformSelectors } = require('./helpers/transformers');

/**
 * Page object base class
 */
class BasePage {
  /**
   * transforms selectors for page
   * @param {object} selectors selectors to transform
   */
  constructor(selectors) {
    this.selectors = transformSelectors(selectors);
  }
}

module.exports = {
  BasePage,
};
