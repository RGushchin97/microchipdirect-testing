const webdriver = require('selenium-webdriver');
const ElementState = require('./elementState');
const log = require('../logger');
const Browser = require('../browser');

/**
 * Class that represents base web element
 */
class BaseElement {
  /**
   * set selector and name of element
   * @param {object} selector selector of web element
   * @param {string} name name of web element
   */
  constructor(selector, name) {
    this.selector = selector;
    this.name = name;
  }

  /**
   * Get string info about element locator
   * @returns {string} locator info
   */
  getElementInfo() {
    return `Locator with type ${this.selector.using} is ${this.selector.value}`;
  }

  /**
   * Find element using selenium
   * @returns {*|*|*|"ok"|"not-equal"|"timed-out"} element if element is found our throws timeout error otherwise
   */
  findElement() {
    return Browser.driver.wait(webdriver
      .until
      .elementLocated(this.selector), Browser.timeout, `Can't find '${this.name}' element. ${this.getElementInfo()}`);
  }

  /**
   * Get string locator
   * @returns {*} locator string value
   */
  getLocator() {
    return this.selector.value;
  }

  /**
   * Wait until element will be present
   * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
   */
  async waitAndAssertIsPresent() {
    log(`Waiting for "${this.name}" is present`);
    await Browser.waitForPageToLoad();
    return Browser.driver.wait(async () => {
      const element = await this.findElement();
      try {
        if (await element.isDisplayed()) {
          return element;
        }
        return false;
      } catch (e) {
        return false;
      }
    }, Browser.timeout, `${this.name} is not present. ${this.getElementInfo()}`);
  }

  /**
   * Wait until element is enabled
   * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
   */
  async waitAndAssertIsEnabled() {
    log(`Waiting for "${this.name}" is enabled`);
    await Browser.waitForPageToLoad();
    return Browser.driver.wait(async () => {
      const element = await this.findElement();
      try {
        if (await element.isEnabled()) {
          return element;
        }
        return false;
      } catch (e) {
        return false;
      }
    }, Browser.timeout, `${this.name} is not enabled`);
  }

  /**
   * Wait until element will be not visible
   * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
   */
  async waitAndAssertIsNotVisible() {
    log(`Waiting for "${this.name}" is absent`);
    await Browser.waitForPageToLoad();
    return Browser.driver.wait(async () => {
      const element = await this.findElement(this.selector);
      try {
        if (!await element.isDisplayed()) {
          return element;
        }
        return false;
      } catch (e) {
        return false;
      }
    }, Browser.timeout, `${this.name} is not absent. ${this.getElementInfo()}`);
  }

  /**
   * Wait until element will be not exists
   * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
   */
  async waitAndAssertIsNotExists() {
    log(`Waiting for "${this.name}" is not exists`);
    const elementLocator = this.selector;
    await Browser.waitForPageToLoad();
    return Browser.driver.wait(async () => {
      const elements = await Browser.driver.findElements(elementLocator);
      return elements.length === 0;
    }, Browser.timeout, `${this.name} is exists. ${this.getElementInfo()}`);
  }

  /**
   * Wait until element will be exists
   * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
   */
  async waitAndAssertIsExists() {
    log(`Waiting for "${this.name}" is exists`);
    const elementLocator = this.selector;
    await Browser.waitForPageToLoad();
    await Browser.driver.wait(async () => {
      const elements = await Browser.driver.findElements(elementLocator);
      return elements.length !== 0;
    }, Browser.timeout, `${this.name} is not exists. ${this.getElementInfo()}`);
    return Browser.driver.findElement(this.selector);
  }

  /* eslint-disable complexity */
  /**
   * Waiting and assert until element will match state
   * @param {string} state expected state of element
   * @returns {*} result of waiting
   */
  waitAndAssertState(state) {
    switch (state.toUpperCase()) {
    case ElementState.PRESENT:
      return this.waitAndAssertIsPresent();
    case ElementState.ENABLED:
      return this.waitAndAssertIsEnabled();
    case ElementState.NOT_VISIBLE:
      return this.waitAndAssertIsNotVisible();
    case ElementState.ABSENT:
    case ElementState.NOT_EXISTS:
      return this.waitAndAssertIsNotExists();
    case ElementState.EXISTS:
    default:
      return this.waitAndAssertIsExists();
    }
  }

  /* eslint-enable complexity */

  /* eslint-disable complexity */
  /**
   * Waiting until element will match state
   * @param {string} state expected state of element
   * @returns {boolean} true if state as expected, false otherwise
   */
  waitForState(state) {
    try {
      this.waitAndAssertState(state);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* eslint-enable complexity */

  /**
   * Clicking on element
   * @returns {Promise<void>} result of clicking
   */
  async click() {
    log(`Clicking "${this.name}"`);
    await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(ElementState.ENABLED);
      try {
        await element.click();
        return true;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't click ${this.name}. ${this.getElementInfo()}`);
  }

  /**
   * Clicking on element
   * @returns {Promise<void>} result of clicking
   */
  async tryClick() {
    log(`Clicking "${this.name}"`);
    try {
      const element = await this.waitAndAssertState(ElementState.EXISTS);
      await element.click();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Set hover on element
   * @returns {Promise<void>} result of hover
   */
  async hover() {
    log(`Hover "${this.name}"`);
    await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(ElementState.ENABLED);
      try {
        const strJavaScript = `var element = arguments[0];
        var mouseEventObj = document.createEvent('MouseEvents');
        mouseEventObj.initEvent('mouseover', true, true );
        element.dispatchEvent(mouseEventObj);`;
        await Browser.driver.executeScript(strJavaScript, element);
        return true;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't hover ${this.name}. ${this.getElementInfo()}`);
  }

  /**
   * Send event acton on element
   * @param {string} cssSelector element selector
   * @param {string} eventName event name
   * @returns {Promise<void>} result of clicking
   */
  static async sendEvent(cssSelector, eventName) {
    log(`Send ${eventName} "${cssSelector}"`);
    try {
      const strJavaScript = `
      function triggerEventOnPage(selector, eventName, memo) {
        var event;
        var element = document.querySelector(selector);

        event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
        event.memo = memo || { };

        element.dispatchEvent(event);
      }
      triggerEventOnPage(arguments[0], arguments[1]);`;
      await Browser.driver.executeScript(strJavaScript, cssSelector, eventName);
    } catch (error) {
      log(error);
      // some error we don't care about
    }
  }

  /**
   * Waiting for element text equals to expected text
   * @param {string} text expected text
   * @returns {Promise<void>} result of assertion
   */
  async waitForText(text) {
    log(`Waiting for "${text}" text in "${this.name}"`);
    const element = await this.waitAndAssertState(ElementState.PRESENT);
    await Browser.driver.wait(webdriver.until.elementTextIs(element, text), Browser.timeout, `${this.name} text is not ${text}. ${this.getElementInfo()}`);
  }

  /**
   * Click on element via JS-command
   * @returns {Promise<void>} result of clicking
   */
  async jsClick() {
    log(`Clicking via JS "${this.name}"`);
    await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(ElementState.PRESENT);
      try {
        await Browser.driver.executeScript('arguments[0].click()', element);
        return true;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't click via JS ${this.name}. ${this.getElementInfo()}`);
  }

  /**
   * receiving text of element
   * @param {Object} state of element
   * @returns {*|!Promise<string>|string} element text
   */
  async getText(state = ElementState.EXISTS) {
    log(`Getting text from "${this.name}"`);
    const text = await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(state);
      try {
        const elementText = await element.getText();
        if (elementText === '') {
          return true;
        }
        return elementText;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't get text of ${this.name}. ${this.getElementInfo()}`);
    if (text === true) {
      log('Text is ""');
      return '';
    }
    log(`Text is "${text}"`);
    return text;
  }

  /**
   * Get element presence state
   * @returns {Promise<boolean>} presence state
   */
  async isPresent() {
    log(`Getting isPresent state of "${this.name}"`);
    try {
      await Browser.waitForPageToLoad();
      return await Browser.driver.findElement(this.selector)
        .isDisplayed();
    } catch (e) {
      return false;
    }
  }

  /**
   * Get element enabled state
   * @returns {Promise<boolean>} enabled state
   */
  async isEnabled() {
    log(`Getting Enabled state of "${this.name}"`);
    try {
      await Browser.waitForPageToLoad();
      return await Browser.driver.findElement(this.selector)
        .isEnabled();
    } catch (e) {
      return false;
    }
  }

  /**
   * Get attribute of element
   * @param {string} attribute attribute name
   * @returns {*|!Promise<?string>|string} attribute value
   */
  async getAttribute(attribute) {
    log(`Getting "${attribute}" attribute of "${this.name}"`);
    const element = await this.waitAndAssertState(ElementState.EXISTS);
    return element.getAttribute(attribute);
  }

  /**
   * Get title of element
   * @returns {*|!Promise<?string>|string} title value
   */
  async getTitle() {
    log(`Getting "title" attribute of "${this.name}"`);
    const element = await this.waitAndAssertState(ElementState.EXISTS);
    return element.getAttribute('title');
  }

  /**
   * Execute in frame
   * @param {Function} func what to execute in frame
   * @returns {Promise<void>} result
   */
  async doInFrame(func) {
    await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(ElementState.EXISTS);
      try {
        await Browser.driver.switchTo()
          .frame(element);
        return true;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't switch to ${this.name}. ${this.getElementInfo()}`);
    await func();
    await Browser.driver.switchTo()
      .defaultContent();
  }

  /**
   * Click all elements by the selector
   * @param {Object} selector element selector
   * @returns {Promise<void>} result
   */
  static async clickAllElements(selector) {
    const elements = await Browser.driver.findElements(selector.locator);
    elements.forEach(async (element) => {
      await element.click();
    });
  }

  /**
   * Scrolls until element is in view
   * @returns {Promise<void>} result
   */
  async scrollToElement() {
    log(`scrollToElement "${this.name}"`);
    await Browser.driver.wait(async () => {
      const element = await this.waitAndAssertState(ElementState.ENABLED);
      try {
        await Browser.driver.executeScript('arguments[0].scrollIntoView(true)', element);
        return true;
      } catch (error) {
        return false;
      }
    }, Browser.timeout, `Can't scrollToElement ${this.name}. ${this.getElementInfo()}`);
  }

  /**
   *
   * @param {Object} selector element selector
   * @returns {int} number of elements found by specified selector
   */
  static async getElementsCount(selector) {
    const elements = await Browser.driver.findElements(selector);
    return elements.length;
  }
}
//
// /**
//  * Get string info about element locator
//  * @param {object} selector element selector
//  * @returns {string} locator info
//  */
// function getElementInfo(selector) {
//   return `Locator with type ${selector.type} is ${selector.locator.value}`;
// }
//
// /**
//  * Find element using selenium
//  * @param {object} selector element selector
//  * @returns {*|*|*|"ok"|"not-equal"|"timed-out"} element if element is found our throws timeout error otherwise
//  */
// function findElement(selector) {
//   return Browser.driver.wait(webdriver.until.elementLocated(selector.locator), Browser.timeout, `Can't find '${selector.name}' element. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Wait until element will be present
//  * @param {Object} selector element selector
//  * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
//  */
// async function waitAndAssertIsPresent(selector) {
//   log(`Waiting for "${selector.name}" is present`);
//   await Browser.waitForPageToLoad();
//   return Browser.driver.wait(async () => {
//     const element = await findElement(selector);
//     try {
//       if (await element.isDisplayed()) {
//         return element;
//       }
//       return false;
//     } catch (e) {
//       return false;
//     }
//   }, Browser.timeout, `${selector.name} is not present. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Wait until element is enabled
//  * @param {Object} selector element selector
//  * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
//  */
// async function waitAndAssertIsEnabled(selector) {
//   log(`Waiting for "${selector.name}" is enabled`);
//   await Browser.waitForPageToLoad();
//   return Browser.driver.wait(async () => {
//     const element = await findElement(selector);
//     try {
//       if (await element.isEnabled()) {
//         return element;
//       }
//       return false;
//     } catch (e) {
//       return false;
//     }
//   }, Browser.timeout, `${selector.name} is not enabled`);
// }
//
// /**
//  * Wait until element will be not visible
//  * @param {Object} selector element selector
//  * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
//  */
// async function waitAndAssertIsNotVisible(selector) {
//   log(`Waiting for "${selector.name}" is absent`);
//   await Browser.waitForPageToLoad();
//   return Browser.driver.wait(async () => {
//     const element = await findElement(selector);
//     try {
//       if (!await element.isDisplayed()) {
//         return element;
//       }
//       return false;
//     } catch (e) {
//       return false;
//     }
//   }, Browser.timeout, `${selector.name} is not absent. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Wait until element will be not exists
//  * @param {Object} selector element selector
//  * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
//  */
// async function waitAndAssertIsNotExists(selector) {
//   log(`Waiting for "${selector.name}" is not exists`);
//   const elementLocator = selector.locator;
//   await Browser.waitForPageToLoad();
//   return Browser.driver.wait(async () => {
//     const elements = await Browser.driver.findElements(elementLocator);
//     return elements.length === 0;
//   }, Browser.timeout, `${selector.name} is exists. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Wait until element will be exists
//  * @param {Object} selector element selector
//  * @returns {*|"ok"|"not-equal"|"timed-out"} result of waiting
//  */
// async function waitAndAssertIsExists(selector) {
//   log(`Waiting for "${selector.name}" is exists`);
//   const elementLocator = selector.locator;
//   await Browser.waitForPageToLoad();
//   await Browser.driver.wait(async () => {
//     const elements = await Browser.driver.findElements(elementLocator);
//     return elements.length !== 0;
//   }, Browser.timeout, `${selector.name} is not exists. ${getElementInfo(selector)}`);
//   return Browser.driver.findElement(selector.locator);
// }
//
// /* eslint-disable complexity */
// /**
//  * Waiting and assert until element will match state
//  * @param {Object} selector element selector
//  * @param {string} state expected state of element
//  * @returns {*} result of waiting
//  */
// function waitAndAssertState(selector, state) {
//   switch (state.toUpperCase()) {
//   case ElementState.PRESENT:
//     return waitAndAssertIsPresent(selector);
//   case ElementState.ENABLED:
//     return waitAndAssertIsEnabled(selector);
//   case ElementState.NOT_VISIBLE:
//     return waitAndAssertIsNotVisible(selector);
//   case ElementState.ABSENT:
//   case ElementState.NOT_EXISTS:
//     return waitAndAssertIsNotExists(selector);
//   case ElementState.EXISTS:
//   default:
//     return waitAndAssertIsExists(selector);
//   }
// }
//
// /* eslint-enable complexity */
//
// /* eslint-disable complexity */
// /**
//  * Waiting until element will match state
//  * @param {Object} selector element selector
//  * @param {string} state expected state of element
//  * @returns {boolean} true if state as expected, false otherwise
//  */
// function waitForState(selector, state) {
//   try {
//     waitAndAssertState(selector, state);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }
//
// /* eslint-enable complexity */
//
// /**
//  * Clicking on element
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result of clicking
//  */
// async function click(selector) {
//   log(`Clicking "${selector.name}"`);
//
//   await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, ElementState.ENABLED);
//     try {
//       await element.click();
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't click ${selector.name}. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Clicking on element
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result of clicking
//  */
// async function tryClick(selector) {
//   log(`Clicking "${selector.name}"`);
//   try {
//     const element = await waitAndAssertState(selector, ElementState.EXISTS);
//     await element.click();
//     return true;
//   } catch (error) {
//     return false;
//   }
// }
//
// /**
//  * Set hover on element
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result of clicking
//  */
// async function hover(selector) {
//   log(`Hover "${selector.name}"`);
//   await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, ElementState.ENABLED);
//     try {
//       const strJavaScript = `var element = arguments[0];
//         var mouseEventObj = document.createEvent('MouseEvents');
//         mouseEventObj.initEvent('mouseover', true, true );
//         element.dispatchEvent(mouseEventObj);`;
//       await Browser.driver.executeScript(strJavaScript, element);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't hover ${selector.name}. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Send event acton on element
//  * @param {string} cssSelector element selector
//  * @param {string} eventName event name
//  * @returns {Promise<void>} result of clicking
//  */
// async function sendEvent(cssSelector, eventName) {
//   log(`Send ${eventName} "${cssSelector}"`);
//   try {
//     const strJavaScript = `
//       function triggerEventOnPage(selector, eventName, memo) {
//         var event;
//         var element = document.querySelector(selector);
//
//         event = document.createEvent("Event");
//         event.initEvent(eventName, true, true);
//         event.memo = memo || { };
//
//         element.dispatchEvent(event);
//       }
//       triggerEventOnPage(arguments[0], arguments[1]);`;
//     await Browser.driver.executeScript(strJavaScript, cssSelector, eventName);
//   } catch (error) {
//     log(error);
//     // some error we don't care about
//   }
// }
//
// /**
//  * Waiting for element text equals to expected text
//  * @param {Object} selector element selector
//  * @param {string} text expected text
//  * @returns {Promise<void>} result of assertion
//  */
// async function waitForText(selector, text) {
//   log(`Waiting for "${text}" text in "${selector.name}"`);
//   const element = await waitAndAssertState(selector, ElementState.PRESENT);
//   await Browser.driver.wait(webdriver.until.elementTextIs(element, text), Browser.timeout, `${selector.name} text is not ${text}. ${getElementInfo(selector)}`);
// }
//
// /**
//  * Click on element via JS-command
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result of clicking
//  */
// async function jsClick(selector) {
//   log(`Clicking via JS "${selector.name}"`);
//   await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, ElementState.PRESENT);
//     try {
//       await Browser.driver.executeScript('arguments[0].click()', element);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't click via JS ${selector.name}. ${getElementInfo(selector)}`);
// }
//
// /**
//  * receiving text of element
//  * @param {Object} selector element selector
//  * @param {Object} state of element
//  * @returns {*|!Promise<string>|string} element text
//  */
// async function getText(selector, state = ElementState.EXISTS) {
//   log(`Getting text from "${selector.name}"`);
//   const text = await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, state);
//     try {
//       const elementText = await element.getText();
//       if (elementText === '') {
//         return true;
//       }
//       return elementText;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't get text of ${selector.name}. ${getElementInfo(selector)}`);
//   if (text === true) {
//     log('Text is ""');
//     return '';
//   }
//   log(`Text is "${text}"`);
//   return text;
// }
//
// /**
//  * Get element presence state
//  * @param {Object} selector element selector
//  * @returns {Promise<boolean>} presence state
//  */
// async function isPresent(selector) {
//   log(`Getting isPresent state of "${selector.name}"`);
//   try {
//     await Browser.waitForPageToLoad();
//     return await Browser.driver.findElement(selector.locator)
//       .isDisplayed();
//   } catch (e) {
//     return false;
//   }
// }
//
// /**
//  * Get element enabled state
//  * @param {Object} selector element selector
//  * @returns {Promise<boolean>} enabled state
//  */
// async function isEnabled(selector) {
//   log(`Getting Enabled state of "${selector.name}"`);
//   try {
//     await Browser.waitForPageToLoad();
//     return await Browser.driver.findElement(selector.locator)
//       .isEnabled();
//   } catch (e) {
//     return false;
//   }
// }
//
// /**
//  * Get attribute of element
//  * @param {Object} selector element selector
//  * @param {string} attribute attribute name
//  * @returns {*|!Promise<?string>|string} attribute value
//  */
// async function getAttribute(selector, attribute) {
//   log(`Getting "${attribute}" attribute of "${selector.name}"`);
//   const element = await waitAndAssertState(selector, ElementState.EXISTS);
//   return element.getAttribute(attribute);
// }
//
// /**
//  * Get title of element
//  * @param {Object} selector element selector
//  * @returns {*|!Promise<?string>|string} title value
//  */
// async function getTitle(selector) {
//   log(`Getting "title" attribute of "${selector.name}"`);
//   const element = await waitAndAssertState(selector, ElementState.EXISTS);
//   return element.getAttribute('title');
// }
//
// /**
//  * Execute in frame
//  * @param {Object} selector frame element selector
//  * @param {Function} func what to execute in frame
//  * @returns {Promise<void>} result
//  */
// async function doInFrame(selector, func) {
//   await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, ElementState.EXISTS);
//     try {
//       await Browser.driver.switchTo()
//         .frame(element);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't switch to ${selector.name}. ${getElementInfo(selector)}`);
//   await func();
//   await Browser.driver.switchTo()
//     .defaultContent();
// }
//
// /**
//  * Click all elements by the selector
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result
//  */
// async function clickAllElements(selector) {
//   const elements = await Browser.driver.findElements(selector.locator);
//   elements.forEach(async (element) => {
//     await element.click();
//   });
// }
//
// /**
//  * Scrolls until element is in view
//  * @param {Object} selector element selector
//  * @returns {Promise<void>} result
//  */
// async function scrollToElement(selector) {
//   log(`scrollToElement "${selector.name}"`);
//   await Browser.driver.wait(async () => {
//     const element = await waitAndAssertState(selector, ElementState.ENABLED);
//     try {
//       await Browser.driver.executeScript('arguments[0].scrollIntoView(true)', element);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }, Browser.timeout, `Can't scrollToElement ${selector.name}. ${getElementInfo(selector)}`);
// }
//
// /**
//  *
//  * @param {Object} selector element selector
//  * @returns {int} number of elements found by specified selector
//  */
// async function getElementsCount(selector) {
//   const elements = await Browser.driver.findElements(selector.locator);
//   return elements.length;
// }

module.exports = {
  // click,
  // tryClick,
  // sendEvent,
  // hover,
  // waitForText,
  // jsClick,
  // getText,
  // waitAndAssertState,
  // isPresent,
  // getAttribute,
  // doInFrame,
  // clickAllElements,
  // scrollToElement,
  // getElementsCount,
  // getTitle,
  // waitForState,
  // isEnabled,
  BaseElement,
};
