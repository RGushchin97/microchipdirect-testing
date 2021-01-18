const selectors = require('./constants');
const { BaseElement } = require('../../../framework/elements');
const { ComparisonItem } = require('../../customElements/comparison-item');
const { BasePage } = require('../../../framework/base-page');
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
   * @param {string} cost cost of item
   * @returns {Promise<void>} result click checkbox
   */
  async selectItem(number, cost) {
    const comparisonItem = new ComparisonItem(cost, number);
    await comparisonItem.select();
    this.selectedItemName = await comparisonItem.getName();
  }

  /**
   * click button on page
   * @param {string} buttonName name of button on page
   * @returns {Promise<void>} result click button
   */
  async clickButton(buttonName) {
    const button = this.elements[buttonName];
    await button.click();
  }

  /**
   * get count of comparison items in table
   * @returns {Promise<int|*>} result
   */
  async getComparisonsCount() {
    return BaseElement.getElementsCount(this.elements.comparisonRowLocator);
  }

  /**
   * wait for item with specified name is displayed in table
   * @param {string} itemName item's name
   * @returns {Promise<void>} result
   */
  isItemDisplayed(itemName) {
    return ComparisonItem.isNameDisplayed(itemName);
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
    const button = this.elements[buttonName];
    return button.isEnabled();
  }

  /**
   * get full list of items names that are in table
   * @returns {Promise<Object[]|*>} result
   */
  async getNamesList() {
    return getAttributes(this.elements.itemNameLocator);
  }
}

module.exports = {
  CompareListPage,
};
