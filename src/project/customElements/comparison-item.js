const { sprintf } = require('sprintf-js');
const { By } = require('selenium-webdriver');
const { STATE_UNCHECKED } = require('../../framework/elements/checkBox');
const { STATE_CHECKED } = require('../../framework/elements/checkBox');
const { CheckBox } = require('../../framework/elements/checkBox');
const { Label } = require('../../framework/elements/label');

/**
 * Custom element class that represents custom comparison item in table
 */
class ComparisonItem {
  /**
   * represents comparison item
   * @param {string} cost comparison item cost
   * @param {number} number index
   */
  constructor(cost, number) {
    this.template = '(//tr[contains(., "%1$s")])[%2$s]';
    this.nameLocator = '//a[@class="Controls"]';
    this.chbxLocator = '//td/input';
    this.itemLocator = sprintf(this.template, cost, number);
    this.lblItem = new Label(By.xpath(this.itemLocator), `Comparison Item [${number}]`);
    this.lblName = new Label(By.xpath(`${this.itemLocator}${this.nameLocator}`), `Comparison Item [${number}] Name`);
    this.chbxSelect = new CheckBox(By.xpath(`${this.itemLocator}${this.chbxLocator}`), `Comparison Item [${number}] Checkbox`);
  }

  /**
   * Get name of comparison item
   * @returns {*|!Promise<string>|string} result
   */
  getName() {
    return this.lblName.getText();
  }

  /**
   * select comparison item
   * @returns {Promise<void>} result
   */
  select() {
    return this.chbxSelect.setCheckboxState(STATE_CHECKED);
  }

  /**
   * unselect comparison item
   * @returns {Promise<void>} result
   */
  unselect() {
    return this.chbxSelect.setCheckboxState(STATE_UNCHECKED);
  }
}

module.exports = {
  ComparisonItem,
};
