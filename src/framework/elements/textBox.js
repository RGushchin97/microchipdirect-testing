const { Key } = require('selenium-webdriver');
const log = require('../logger');
const ElementState = require('./elementState');
const Browser = require('../browser');
const { BaseElement } = require('./baseElement');


class TextBox extends BaseElement {
  /**
   * Set text into textbox
   * @param {string} text text to setting
   * @returns {Promise<void>} result of setting
   */
  async setText(text) {
    log(`Setting "${text}" text into "${this.name}"`);
    const element = await this.waitAndAssertState(ElementState.PRESENT);
    await element.clear();
    await element.sendKeys(text);
  }

  /**
   * receiving text of element
   * @returns {*|!Promise<?string>|string} element text clearViaKeys
   */
  getTextboxValue() {
    log(`Getting value of "${this.name}"`);
    return this.getAttribute('value');
  }

  /** clear Via Keys
   * @returns {*|!Promise<?string>|string} element text
   */
  async clearViaKeys() {
    log(`Clear via keys "${this.name}"`);
    const element = await waitAndAssertState(this.selector, ElementState.PRESENT);
    await element.sendKeys(Key.chord(Key.CONTROL, 'a'));
    return element.sendKeys(Key.DELETE);
  }

  /**
   * Waiting for element text equals to expected text
   * @param {string} text expected text
   * @returns {Promise<void>} result of assertion
   */
  waitForTextboxValue(text) {
    log(`Waiting for "${text}" text in "${this.name}"`);
    return Browser.driver.wait(async () => {
      const actualText = await this.getTextboxValue();
      return actualText === text;
    }, Browser.timeout, `${this.name} text is not ${text}. Locator with type ${this.selector.type} is ${this.selector.locator}`);
  }

  /**
   * Set text to textbox and press Enter
   * @param {string} text text
   */
  async setTextAndSubmit(text) {
    const element = await this.waitAndAssertState(ElementState.PRESENT);
    await this.click();
    await this.setText(text);
    return element.sendKeys(Key.ENTER);
  }

  /**
   * Submit textbox
   * @param {Object} selector element selector
   */
  async submit() {
    const element = await this.waitAndAssertState(ElementState.PRESENT);
    return element.sendKeys(Key.ENTER);
  }
}
// /**
//  * Set text into textbox
//  * @param {Object} selector element selector
//  * @param {string} text text to setting
//  * @returns {Promise<void>} result of setting
//  */
// async function setText(selector, text) {
//   log(`Setting "${text}" text into "${selector.name}"`);
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   await element.clear();
//   await element.sendKeys(text);
// }
//
// /**
//  * receiving text of element
//  * @param {Object} selector element selector
//  * @returns {*|!Promise<?string>|string} element text clearViaKeys
//  */
// function getTextboxValue(selector) {
//   log(`Getting value of "${selector.name}"`);
//   return getAttribute(selector, 'value');
// }
//
// /** clear Via Keys
//  * @param {Object} selector element selector
//  * @returns {*|!Promise<?string>|string} element text
//  */
// async function clearViaKeys(selector) {
//   log(`Clear via keys "${selector.name}"`);
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   await element.sendKeys(Key.chord(Key.CONTROL, 'a'));
//   return element.sendKeys(Key.DELETE);
// }
//
// /**
//  * Waiting for element text equals to expected text
//  * @param {Object} selector element selector
//  * @param {string} text expected text
//  * @returns {Promise<void>} result of assertion
//  */
// function waitForTextboxValue(selector, text) {
//   log(`Waiting for "${text}" text in "${selector.name}"`);
//   return Browser.driver.wait(async () => {
//     const actualText = await getTextboxValue(selector);
//     return actualText === text;
//   }, Browser.timeout, `${selector.name} text is not ${text}. Locator with type ${selector.type} is ${selector.locator}`);
// }
//
// /**
//  * Set text to textbox and press Enter
//  * @param {Object} selector element selector
//  * @param {string} text text
//  */
// async function setTextAndSubmit(selector, text) {
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   await click(selector);
//   await setText(selector, text);
//   return element.sendKeys(Key.ENTER);
// }
//
// /**
//  * Submit textbox
//  * @param {Object} selector element selector
//  */
// async function submit(selector) {
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   return element.sendKeys(Key.ENTER);
// }

module.exports = {
  TextBox,
};
