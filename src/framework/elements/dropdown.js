const { transformSelectors } = require('../helpers/transformers');

const log = require('../logger');
const { BaseElement } = require('./baseElement');

/**
 * Class that represents web dropdown
 */
class DropDown extends BaseElement {
  /**
   * select By Value
   * @param {string} item text to setting
   * @param {boolean} toHide hide element if it is not hiding automatically
   * @returns {Promise<void>} result of setting
   */
  async selectByValue(item, toHide = false) {
    await this.click();
    await new BaseElement(transformSelectors({
      'Value from dropdown': {
        selector: `//option[@value='${item}']`,
        type: 'xpath',
      },
    })['Value from dropdown'], 'Value from dropdown');
    if (toHide) {
      await this.click();
    }
  }

  /**
   * select By Text
   * @param {string} text text to setting
   * @param {boolean} toHide hide element if it is not hiding automatically
   * @returns {Promise<void>} result of setting
   */
  async selectByText(text, toHide = false) {
    log(`Setting "${text}" text into "${this.name}"`);
    await this.click();
    await new BaseElement(transformSelectors({
      'Item from dropdown': {
        selector: `${this.selector.selector}//option[.='${text}']`,
        type: 'xpath',
      },
    })['Item from dropdown'], 'Item from dropdown').click();
    if (toHide) {
      await this.click();
    }
  }
}

module.exports = {
  DropDown,
};
