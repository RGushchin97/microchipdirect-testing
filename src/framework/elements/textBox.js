const { Key } = require('selenium-webdriver');
const log = require('../logger');
const ElementState = require('./elementState');
const Browser = require('../browser');
const { BaseElement } = require('./baseElement');

/**
 * Class that represents web text box
 */
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
    const element = await this.waitAndAssertState(ElementState.PRESENT);
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
    }, Browser.timeout, `${this.name} text is not ${text}. Locator with type ${this.selector.using} is ${this.selector.value}`);
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

module.exports = {
  TextBox,
};
