const { BasePage } = require('../../../framework/base-page');
const { selectors } = require('./constants');
const { getNumberForOption } = require('./constants');
const { getNumbersForTable } = require('./constants');
const { click } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');

/**
 * Page object class for working with categories table page
 */
class CategoryTablePage extends BasePage {
  /**
   * represents a categories table page
   * @constructor
   */
  constructor() {
    super(selectors);
  }

  /**
   * selects option from categories table
   * @param {string} option option for select
   * @param {string} table table where option is located
   * @returns {Promise<void>} result clicking on option
   */
  async selectOption(option, table) {
    const tableNumbers = getNumbersForTable(table);
    const [column, number] = tableNumbers;
    const tableSelector = fromPattern(this.selectors.Table, column, number);
    const optionSelector = fromPattern(this.selectors.Option, tableSelector.selector, getNumberForOption(option));
    await click(optionSelector);
  }
}

module.exports = {
  CategoryTablePage,
};
