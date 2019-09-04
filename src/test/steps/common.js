const {
  When,
  Given,
} = require('cucumber');

const Browser = require('../../framework/browser');
const DataReader = require('../../framework/helpers/dataReader');

/**
 * Navigate to given url
 * @param {string} testDataUrl path in test data json where urlg is stored
 * This step executes the following actions:
 * 1. reads test data by input parameter
 * 2. navigated to the url from test data in browser
 */
Given(/^I navigated to '(.*)'$/, async (testDataUrl) => {
  await Browser.openUrl(testDataUrl);
});

/**
 * Sets value by the key
 * @param {string} valueString value
 * @param {string} pathString path in test data json where value to be stored
 * This step executes the following actions:
 * 1. reads test data by input parameter
 * 2. sets value
 */
When(/^I set expected '(.*)' to '(.*)'$/, (valueString, pathString) => {
  const value = DataReader.getObject(valueString);
  DataReader.setObject(pathString, value);
});

/**
 * Navigates back in browser
 */
When(/^I navigate back$/, async () => {
  await Browser.navigateBack();
});

/**
 * Switch to last window in browser
 */
When(/^I switch to last window$/, async () => {
  await Browser.switchToLastWindow();
  await Browser.waitForPageToLoad();
});
