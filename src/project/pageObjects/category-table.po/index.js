const { BasePage } = require('../../../framework/base-page');
const elements = require('./constants');
/**
 * Page object class for working with categories table page
 */
class CategoryTablePage extends BasePage {
  /**
   * represents a categories table page
   * @constructor
   */
  constructor() {
    super(elements);
  }

  /**
   * selects option from categories table
   * @param {string} option option for select
   * @param {string} table table where option is located
   * @returns {Promise<void>} result clicking on option
   */
  async selectOption(option, table) {
    await this.elements[table][option].click();
  }
}

module.exports = {
  CategoryTablePage,
};
