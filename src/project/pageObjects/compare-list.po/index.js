const selectors = require('./constants');
const { waitAndAssertState } = require('../../../framework/elements/baseElement');
const { getElementsCount } = require('../../../framework/elements/baseElement');
const { getText } = require('../../../framework/elements/baseElement');
const { click } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');
const { transformSelectors } = require('../../../framework/helpers/transformers');
const ElementState = require('../../../framework/elements/elementState');
const { getAttributes } = require('../../customElements/listGroupTable');

class CompareListPage {
  constructor() {
    this.selectors = transformSelectors(selectors);
  }

  async selectItem(number, cost) {
    const itemSelector = fromPattern(this.selectors['Item'], cost, number);
    const checkboxSelector = fromPattern(this.selectors['Item Checkbox'], itemSelector.selector);
    await click(fromPattern(checkboxSelector));
    await this.setSelectedItemName(itemSelector);
  }

  async clickCompare() {
    const buttonCompareSelector = this.selectors['Button Compare'];
    await click(buttonCompareSelector);
  }

  async clickShowFullList() {
    const buttonShowFullList = this.selectors['Button Show Full List'];
    await click(buttonShowFullList);
  }

  async getComparisonsCount() {
    const comparisonItemSelector = this.selectors['Comparison Row'];
    return getElementsCount(comparisonItemSelector);
  }

  async setSelectedItemName(itemSelector) {
    const nameSelector = fromPattern(this.selectors['Item Name'], itemSelector.selector);
    this.selectedItemName = await getText(nameSelector);
  }

  async waitForTableItemIsDisplayed(itemName) {
    const itemSelector = fromPattern(this.selectors['Comparison Item'], this.selectors['Comparison Row'].selector, itemName);
    await waitAndAssertState(itemSelector, ElementState.PRESENT);
  }

  getSelectedItemName() {
    return this.selectedItemName;
  }

  async waitForButtonCompareIsAvailable() {
    const buttonCompareSelector = this.selectors['Button Compare'];
    await waitAndAssertState(buttonCompareSelector, ElementState.ENABLED);
  }

  async getNamesList() {
    const selector = fromPattern(this.selectors['Item Name'], '/');
    return getAttributes(selector);
  }
}

module.exports = {
  CompareListPage,
};
