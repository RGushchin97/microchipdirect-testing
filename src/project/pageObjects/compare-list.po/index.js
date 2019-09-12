const selectors = require('./constants');
const { waitAndAssertState } = require('../../../framework/elements/baseElement');
const { getElementsCount } = require('../../../framework/elements/baseElement');
const { getText } = require('../../../framework/elements/baseElement');
const { click } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');
const { transformSelectors } = require('../../../framework/helpers/transformers');
const ElementState = require('../../../framework/elements/elementState');
const { getAttributes } = require('../../customElements/listGroupTable');

/**
 * Page object class for working with comparing list page
 */
class CompareListPage {
  /**
   * represents comparing list page
   * @constructor
   */
  constructor() {
    this.selectors = transformSelectors(selectors);
  }

  /**
   * select/unselect item via clicking it's checkbox
   * @param {number} number index number of element with specified cost
   * @param {number} cost cost of item
   * @returns {Promise<void>} result click checkbox
   */
  async selectItem(number, cost) {
    const itemSelector = fromPattern(this.selectors.Item, cost, number);
    const checkboxSelector = fromPattern(this.selectors['Item Checkbox'], itemSelector.selector);
    await click(fromPattern(checkboxSelector));
    await this.setSelectedItemName(itemSelector);
  }

  /**
   * click button on page
   * @param {string} buttonName name of button on page
   * @returns {Promise<void>} result click button
   */
  async clickButton(buttonName) {
    const buttonSelector = this.selectors[buttonName];
    await click(buttonSelector);
  }

  /**
   * get count of comparison items in table
   * @returns {Promise<int|*>} result
   */
  async getComparisonsCount() {
    const comparisonItemSelector = this.selectors['Comparison Row'];
    return getElementsCount(comparisonItemSelector);
  }

  /**
   * remember item name after it's selection
   * @param {object} itemSelector selector to selected item
   * @returns {Promise<void>} result get text from item and remember
   */
  async setSelectedItemName(itemSelector) {
    const nameSelector = fromPattern(this.selectors['Item Name'], itemSelector.selector);
    this.selectedItemName = await getText(nameSelector);
  }

  /**
   * wait for item with specified name is displayed in table
   * @param {string} itemName item's name
   * @returns {Promise<void>} result
   */
  async waitForTableItemIsDisplayed(itemName) {
    const itemSelector = fromPattern(this.selectors['Comparison Item'], this.selectors['Comparison Row'].selector, itemName);
    await waitAndAssertState(itemSelector, ElementState.PRESENT);
  }

  /**
   * get name of selected item
   * @returns {string} itemName
   */
  getSelectedItemName() {
    return this.selectedItemName;
  }

  /**
   * wait for button with specified name is available
   * @param {string} buttonName button's name (text)
   * @returns {Promise<void>} result
   */
  async waitForButtonIsAvailable(buttonName) {
    const buttonCompareSelector = this.selectors[buttonName];
    await waitAndAssertState(buttonCompareSelector, ElementState.ENABLED);
  }

  /**
   * get full list of items names that are in table
   * @returns {Promise<Object[]|*>} result
   */
  async getNamesList() {
    const selector = fromPattern(this.selectors['Item Name'], '/');
    return getAttributes(selector);
  }
}

module.exports = {
  CompareListPage,
};
