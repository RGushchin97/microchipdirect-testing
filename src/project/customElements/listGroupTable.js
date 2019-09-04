const { getElementsCount, isPresent } = require('../../framework/elements/baseElement');

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

module.exports = {
  getRowsCount,
  hasColumn,
  hasRows,
};
