const selectors = require('./constants');
const { BasePage } = require('../../../framework/base-page');
const { STATE_CHECKED } = require('../../../framework/elements/checkBox');
const { isEnabled } = require('../../../framework/elements/baseElement');
const { setCheckboxState } = require('../../../framework/elements/checkBox');
const { getElementsCount } = require('../../../framework/elements/baseElement');
const { getText } = require('../../../framework/elements/baseElement');
const { click } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');
const { isPresent } = require('../../../framework/elements/baseElement');
const { getAttributes } = require('../../customElements/listGroupTable');

/**
 * Page object class for working with comparing list page
 */
class CompareListPage extends BasePage {
  /**
   * represents comparing list page
   * @constructor
   */
  constructor() {
    super(selectors);
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
    await setCheckboxState(checkboxSelector, STATE_CHECKED);
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
  isItemDisplayed(itemName) {
    const itemSelector = fromPattern(this.selectors['Comparison Item'], this.selectors['Comparison Row'].selector, itemName);
    return isPresent(itemSelector);
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
  isButtonAvailable(buttonName) {
    const buttonCompareSelector = this.selectors[buttonName];
    return isEnabled(buttonCompareSelector);
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
