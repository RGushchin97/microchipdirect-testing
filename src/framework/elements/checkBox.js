const log = require('../logger');
const ElementState = require('./elementState');
const { BaseElement } = require('./baseElement');

/**
 * Class that represents web checkbox
 */
class CheckBox extends BaseElement {
  /**
   * set Checkbox State
   * @param {string} state state to setting
   * @returns {Promise<void>} result of setting
   */
  async setCheckboxState(state) {
    log(`Setting "${state}" into "${this.name}" checkbox`);
    const element = await this.waitAndAssertState(ElementState.PRESENT);
    const isSelected = await element.isSelected();
    if (state !== isSelected) {
      await this.jsClick();
    }
  }

  /**
   * get Checkbox State
   * @returns {boolean} checkbox state
   */
  async getCheckboxState() {
    log(`Getting state of "${this.name}" checkbox`);
    const element = await this.waitAndAssertState(ElementState.EXISTS);
    return element.isSelected();
  }
}

// /**
//  * set Checkbox State
//  * @param {Object} selector element selector
//  * @param {string} state state to setting
//  * @returns {Promise<void>} result of setting
//  */
// async function setCheckboxState(selector, state) {
//   log(`Setting "${state}" into "${selector.name}" checkbox`);
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   const isSelected = await element.isSelected();
//   if (state !== isSelected) {
//     await jsClick(selector);
//   }
// }
//
// /**
//  * get Checkbox State
//  * @param {Object} selector element selector
//  * @returns {boolean} checkbox state
//  */
// async function getCheckboxState(selector) {
//   log(`Getting state of "${selector.name}" checkbox`);
//   const element = await waitAndAssertState(selector, ElementState.EXISTS);
//   return element.isSelected();
// }

const STATE_CHECKED = 'checked';
const STATE_UNCHECKED = 'unchecked';

module.exports = {
  CheckBox,
  STATE_CHECKED,
  STATE_UNCHECKED,
};
