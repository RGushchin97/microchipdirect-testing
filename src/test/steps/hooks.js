const {
  setDefaultTimeout, After, Before, Status, AfterAll,
} = require('cucumber');
// const QueryObject = require('../../framework/helpers/db/queryObject');
const globalConfig = require('../../environment/config');
const Browser = require('../../framework/browser');
const log = require('../../framework/logger');
const environment = require('../../environment/environment');
const cookieBanner = require('../../project/pageObjects/cookie-banner.po');

setDefaultTimeout(globalConfig.CUCUMBER_TIMEOUT);

// eslint-disable-next-line no-console
const defaultLog = console.log;

/**
 * Overriding console.log for adding log to html-report
 */
const addLogToReport = () => {
  // eslint-disable-next-line no-console
  console.log = (text) => {
    defaultLog(text);
  };
};

Before(async (testCase) => {
  if (testCase.pickle.tags.filter((tag) => tag.name === '@ui').length > 0) {
    await Browser.build(globalConfig.HUB, globalConfig.BROWSER, globalConfig.DEFAULT_TIMEOUT);
    await Browser.driver.manage().window().setRect({
      width: globalConfig.SCREEN_WIDTH,
      height: globalConfig.SCREEN_HEIGHT,
    });
    await Browser.openUrl(environment.Microchipdirect);
    // await click(selectors['Cookie Banner Accept']);
    await cookieBanner.accept();
  }
});

Before(addLogToReport);

/* eslint-disable consistent-return, max-statements, complexity, func-names */
After(async function (testCase) {
  // eslint-disable-next-line no-console
  console.log = defaultLog;

  if (testCase.pickle.tags.filter((tag) => tag.name === '@ui').length > 0) {
    try {
      if (testCase.result.status !== Status.PASSED) {
        const screenShot = await Browser.driver.takeScreenshot();
        this.attach(screenShot, 'image/png');
      }
    } catch (e) {
      log(e);
    }
    return Browser.close();
  }
});
// /* eslint-enable consistent-return max-statements complexity func-names */

AfterAll(() => {
  // QueryObject.closeAllConnections();
});
