const { Builder, Capabilities, logging } = require('selenium-webdriver');
const log = require('./logger');

const TIMEOUT_DIVISION_FOR_LOG = 2;
/**
 * Class with common methods for working with browser
 */
class Browser {
  /**
   * Navigate to url
   * @param {string} url URL for navigating
   * @returns {!Promise<void>} A promise that will be resolved when the document
   *     has finished loading.
   */
  static openUrl(url) {
    log(`Navigating to ${url}`);
    return Browser.driver.get(url);
  }

  /**
   * Creation instance of browser
   * @param {string} hub selenium server url
   * @param {string} browser browser name
   * @param {number} timeout wait timeout
   */
  static async build(hub, browser, timeout) {
    Browser.timeout = timeout;
    let capabilities = null;
    const chromeOptions = {
      args: ['incognito', 'ignore-certificate-errors'],
    };

    log(`Starting ${browser} browser`);
    switch (browser) {
    case 'firefox':
      capabilities = Capabilities.firefox();
      capabilities.set('enableVNC', true);
      break;
    case 'chrome':
    default:
      capabilities = Capabilities.chrome();
      capabilities.set('enableVNC', true);
      capabilities.set('chromeOptions', chromeOptions);
      capabilities.set('goog:chromeOptions', chromeOptions);
      capabilities.set('w3c', false);
    }

    Browser.driver = await new Builder()
      .disableEnvironmentOverrides()
      .usingServer(hub)
      .forBrowser(browser)
      .withCapabilities(capabilities)
      .build();
  }

  /**
   * Closing instance of browser
   * @returns {Promise<void>} result of closing
   */
  static async close() {
    log('Closing browser');
    await Browser.driver.quit();
    Browser.driver = null;
  }

  /**
   * Waiting for page to load via receiving document.readyState property value and until no one active request will be in progress
   * @returns {Promise<void>} Error if page not load during default timeout
   */
  static async waitForPageToLoad() {
    log('Waiting for page to load');
    await Browser.driver.wait(async () => {
      const readyState = await Browser.driver.executeScript('return document.readyState');
      return readyState === 'complete';
    }, Browser.timeout, 'Page not loaded');
    const requests = {
    };
    await Browser.driver.wait(async () => {
      const logs = await Browser.driver.manage().logs().get(logging.Type.SERVER);
      logs.forEach((logEntry) => {
        if (logEntry.message.includes('requestWillBeSent')) {
          requests[JSON.parse(logEntry.message).message.params.requestId] = Date.now();
        } else if (logEntry.message.includes('Network')) {
          const { requestId } = JSON.parse(logEntry.message).message.params;
          if (requests[requestId]) {
            delete requests[requestId];
          }
        }
      });
      Object.keys(requests).forEach((requestId) => {
        if (Date.now() - requests[requestId] > Browser.timeout / TIMEOUT_DIVISION_FOR_LOG) {
          delete requests[requestId];
        }
      });
      return Object.keys(requests).length === 0;
    }, Browser.timeout, 'Page not loaded');
  }

  /**
   * Pause for ${ms} milliseconds
   * @param {number} ms milliseconds
   * @returns {Promise<void>} result of sleeping
   */
  static async sleep(ms) {
    log(`Sleeping for ${ms}ms`);
    await Browser.driver.sleep(ms);
  }

  /**
   * Navigate back in browser
   */
  static async navigateBack() {
    await Browser.driver.navigate().back();
  }

  /**
   * Switch to the last window
   */
  static async switchToLastWindow() {
    const windows = await Browser.driver.getAllWindowHandles();
    await Browser.driver.switchTo().window(windows.pop());
  }

  /**
   * Refresh page
   */
  static async refresh() {
    await Browser.driver.navigate().refresh();
  }
}

module.exports = Browser;
