const selectors = require('./constants');
const { fromTemplate } = require('../../../framework/helpers/transformers');
const { Label } = require('../../../framework/elements/label');
const { BasePage } = require('../../../framework/base-page');
const { hasRows } = require('../../customElements/listGroupTable');

/**
 * Page object class for working with programming cost item page
 */
class ProgrammingCostItemPage extends BasePage {
  /**
   * represents programming cost item page
   * @constructor
   */
  constructor() {
    super(selectors);
  }

  /**
   * get item pricing name
   * @returns {Promise<*>} result name
   */
  async getItemPricingName() {
    return this.elements.lblPricingItemName.getText();
  }

  /**
   * get item pricing label text
   * @param {number} step step
   * @returns {Promise<*>} result text
   */
  async getItemPricingLabelText(step) {
    return new Label(fromTemplate(this.elements.stepCardTitleLocatorTemplate, step), `Step ${step} Pricing Label`).getText();
  }

  /**
   * is item has rows value
   * @param {number} step step
   * @returns {Promise<boolean|*>} result is has rows
   */
  async isItemHasRowsValue(step) {
    const cardSelector = fromTemplate(this.elements.stepCardLocatorTemplate, step);
    const rowsSelector = fromTemplate(this.elements.listGroupTableRowsLocatorTemplate, cardSelector.value);
    return hasRows(rowsSelector);
  }

  /**
   * is upload button present
   * @returns {Promise<*>} result is present
   */
  isUploadButtonPresent() {
    return this.elements.btnUpload.isPresent();
  }

  /**
   * wait for 'enabled' state of upload button
   * @returns {Promise<void>} result wait
   */
  isUploadButtonEnabled() {
    return this.elements.btnUpload.isEnabled();
  }
}

module.exports = {
  ProgrammingCostItemPage,
};
