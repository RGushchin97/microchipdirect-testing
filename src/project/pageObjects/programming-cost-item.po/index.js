const selectors = require('./constants');
const { getText, isPresent, waitAndAssertState } = require('../../../framework/elements');
const ElementState = require('../../../framework/elements');
const { hasRows } = require('../../customElements/listGroupTable');
const { transformSelectors, fromPattern } = require('../../../framework/helpers/transformers');

class ProgrammingCostItemPage {
  async getItemPricingName() {
    return await getText(transformSelectors(selectors)['Showing Pricing For Part Number']);
  }

  async getItemPricingLabelText(step) {
    return await getText(fromPattern(selectors['Step Card Title'], step));
  }

  async isItemHasRowsValue(step) {
    const cardSelector = fromPattern(selectors['Step Card'], step);
    return await hasRows(fromPattern(selectors['List Group Table Rows'], cardSelector.selector));
  }

  async isUploadButtonPresent(step) {
    return isPresent(fromPattern(selectors['Step Card Upload Button'], step));
  }

  async waitForUploadButtonEnabled(step) {
    await waitAndAssertState(fromPattern(selectors['Step Card Upload Button'], step), ElementState.ENABLED);
  }
}

module.exports = {
  ProgrammingCostItemPage,
};
