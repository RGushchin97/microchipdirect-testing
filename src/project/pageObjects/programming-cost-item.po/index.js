const selectors = require('./constants');
const { getText, isPresent, waitAndAssertState } = require('../../../framework/elements');
const ElementState = require('../../../framework/elements');
const { hasRows } = require('../../customElements/listGroupTable');
const { transformSelectors, fromPattern } = require('../../../framework/helpers/transformers');

/**
 * Page object class for working with programming cost item page
 */
class ProgrammingCostItemPage {
  /**
   * represents programming cost item page
   * @constructor
   */
  constructor() {
    this.selectors = transformSelectors(selectors);
  }

  /**
   * get item pricing name
   * @returns {Promise<*>} result name
   */
  async getItemPricingName() {
    return getText(this.selectors['Showing Pricing For Part Number']);
  }

  /**
   * get item pricing label text
   * @param {number} step step
   * @returns {Promise<*>} result text
   */
  async getItemPricingLabelText(step) {
    return getText(fromPattern(this.selectors['Step Card Title'], step));
  }

  /**
   * is item has rows value
   * @param {number} step step
   * @returns {Promise<boolean|*>} result is has rows
   */
  async isItemHasRowsValue(step) {
    const cardSelector = fromPattern(this.selectors['Step Card'], step);
    return hasRows(fromPattern(this.selectors['List Group Table Rows'], cardSelector.selector));
  }

  /**
   * is upload button present
   * @param {number} step step
   * @returns {Promise<*>} result is present
   */
  async isUploadButtonPresent(step) {
    return isPresent(fromPattern(this.selectors['Step Card Upload Button'], step));
  }

  /**
   * wait for 'enabled' state of upload button
   * @param {number} step step
   * @returns {Promise<void>} result wait
   */
  async waitForUploadButtonEnabled(step) {
    await waitAndAssertState(fromPattern(this.selectors['Step Card Upload Button'], step), ElementState.ENABLED);
  }
}

module.exports = {
  ProgrammingCostItemPage,
};
