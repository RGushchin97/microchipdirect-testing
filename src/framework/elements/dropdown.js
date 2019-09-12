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

// /**
//  * select By Value
//  * @param {Object} selector element selector
//  * @param {string} item text to setting
//  * @param {boolean} toHide hide element if it is not hiding automatically
//  * @returns {Promise<void>} result of setting
//  */
// async function selectByValue(selector, item, toHide = false) {
//   await click(selector);
//   await click(transformSelectors({
//     'Value from dropdown': {
//       selector: `//option[@value='${item}']`,
//       type: 'xpath',
//     },
//   })['Value from dropdown']);
//   if (toHide) {
//     await click(selector);
//   }
// }
//
// /**
//  * select By Text
//  * @param {Object} selector element selector
//  * @param {string} text text to setting
//  * @param {boolean} toHide hide element if it is not hiding automatically
//  * @returns {Promise<void>} result of setting
//  */
// async function selectByText(selector, text, toHide = false) {
//   log(`Setting "${text}" text into "${selector.name}"`);
//   await click(selector);
//   await click(transformSelectors({
//     'Item from dropdown': {
//       selector: `${selector.selector}//option[.='${text}']`,
//       type: 'xpath',
//     },
//   })['Item from dropdown']);
//   if (toHide) {
//     await click(selector);
//   }
// }

module.exports = {
  DropDown,
};
