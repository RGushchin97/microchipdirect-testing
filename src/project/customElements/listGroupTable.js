const { getElementsCount, isPresent } = require('../../framework/elements/baseElement');
const Browser = require('../../framework/browser');
/**
 * get rows count
 * @param {object} selector selector of table rows
 * @returns {Promise<number>} count
 */
const getRowsCount = (selector) => getElementsCount(selector);

/**
 * is table has column
 * @param {object} selector selector of table column
 * @returns {Promise<boolean>} result
 */
const hasColumn = (selector) => isPresent(selector);

/**
 * is table has rows
 * @param {object} selector selector of table rows
 * @returns {Promise<boolean>} result
 */
const hasRows = async (selector) => {
  const rowsCount = await getRowsCount(selector);
  return rowsCount > 0;
};

/**
 * get array of same attributes from multiple elements
 * @param {object} selector selector of elements
 * @param {string} attribute HTML attribute, default value = 'innerText'
 * @returns {Promise<object[]>} result
 */
const getAttributes = async (selector, attribute = 'innerText') => {
  const elements = await Browser.driver.findElements(selector);
  const promises = elements.map(async (el) => el.getAttribute(attribute));
  return Promise.all(promises).then((result) => result);
};

module.exports = {
  getRowsCount,
  hasColumn,
  hasRows,
  getAttributes,
};
