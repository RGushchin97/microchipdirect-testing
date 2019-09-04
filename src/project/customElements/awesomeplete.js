const log = require('../../framework/logger');
const textBox = require('../../framework/elements/textBox');
const { sendIvent, waitAndAssertState } = require('../../framework/elements/baseElement');
const { transformSelectors } = require('../../framework/helpers/transformers');
const Browser = require('../../framework/browser');
const ElementState = require('../../framework/elements/elementState');

/**
 * get autocomplete selector
 * @param {string} listAreaId value of aria-owns attribute
 * @returns {Promise<void>} result selector
 */
const getAutocompleteSelector = (listAreaId) => transformSelectors({
  Autocomplete: {
    selector: `.awesomplete > input[aria-owns="${listAreaId}"]`,
    type: 'css',
  },
}).Autocomplete;

/**
 * get autocomplete item selector
 * @param {string} listAreaId value of aria-owns attribute
 * @param {number} index autocomplete item index
 * @returns {Promise<void>} result selector
 */
const getItemSelector = (listAreaId, index) => transformSelectors({
  'Item from Autocomplete': {
    selector: `.awesomplete > #${listAreaId} > li:nth-child(${index})`,
    type: 'css',
  },
})['Item from Autocomplete'];

/**
 * try click autocomplete item
 * @param {string} listAreaId value of aria-owns attribute
 * @param {number} index autocomplete item index
 * @param {function} nameBack callback item name
 * @returns {Promise<boolean>} result of click
 */
/* eslint-disable */
const tryClickItem = async (listAreaId, index, nameBack) => {
  const element = await waitAndAssertState(getItemSelector(listAreaId, index), ElementState.EXISTS);
  if (!await element.isDisplayed()) {
    await sendIvent(getAutocompleteSelector(listAreaId).selector, 'input');
  }
  const itemText = await element.getText();
  if (itemText !== '') {
    nameBack(itemText);
  }
  element.click();
  const searchText = await textBox.getTextboxValue(getAutocompleteSelector(listAreaId));
  log(`The '${itemText}' should be selected. Search value is '${searchText}'.`);
  return searchText === itemText;
};

/**
 * select autocomplete item
 * @param {string} listAreaId value of aria-owns attribute
 * @param {number} index autocomplete item index
 * @param {function} nameBack callback item name
 * @returns {Promise<void>} result of setting
 */
const selectItem = async (listAreaId, index, nameBack) => {
  log('Click Awesomplete Item');
  await Browser.driver.wait(async () => {
    try {
      return await tryClickItem(listAreaId, index, nameBack);
    } catch (error) {
      return false;
    }
  }, Browser.timeout, `Can't send click Awesomplete Item ${getItemSelector(listAreaId, index).selector}`);
};

/**
 * select Autocomplete item
 * @param {string} listAreaId value of aria-owns attribute
 * @param {string} text input text
 * @param {number} index item to select
 * @param {function} nameBack callback item name
 * @returns {Promise<void>} result of setting
 */
const selectAwesompleteItem = async (listAreaId, text, index, nameBack) => {
  log(`Selecting "${index}" item in autocomplete from Autocomplete after input "${text}" text `);
  await textBox.setText(getAutocompleteSelector(listAreaId), text);
  await selectItem(listAreaId, index, nameBack);
};

/**
 * Get Autocomplete text
 * @param {string} listAreaId value of aria-owns attribute
 * @returns {Promise<void>} result text
 */
const getAwesompleteText = (listAreaId) => textBox.getTextboxValue(getAutocompleteSelector(listAreaId));

/**
 * Press Enter for Autocomplete
 * @param {string} listAreaId value of aria-owns attribute
 * @returns {Promise<void>} result
 */
const sendEnterToAwesomplete = (listAreaId) => textBox.submit(getAutocompleteSelector(listAreaId));

module.exports = {
  selectAwesompleteItem,
  getAwesompleteText,
  sendEnterToAwesomplete,
};
