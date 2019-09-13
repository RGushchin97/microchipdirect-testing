const { By } = require('selenium-webdriver');
const { sprintf } = require('sprintf-js');

/**
   * Add to each selector its name and locator
   * @param {Object} selectors object with selectors in properties
   * @returns {*} modified selectors
   */
function transformSelectors(selectors) {
  Object.keys(selectors).forEach((key) => {
    const selector = selectors[key];
    selector.name = key;
    selector.locator = By[selector.type](selector.selector);
  });
  return selectors;
}

/**
   * Insert values into locator template
   * @param {object} selector element selector
   * @param {*} params values for insert
   * @returns {object} updated selector
   */
function fromPattern(selector, ...params) {
  const selectorHere = JSON.parse(JSON.stringify(selector));
  selectorHere.selector = sprintf(selectorHere.selector, ...params);
  selectorHere.locator.value = sprintf(selectorHere.locator.value, ...params);
  return selectorHere;
}

/**
 * Insert values into locator template
 * @param {object} template element locator
 * @param {*} params object values for insert
 * @returns {object} updated locator
 */
function fromTemplate(template, ...params) {
  const selector = {};
  selector.using = template.using;
  selector.value = sprintf(template.value, ...params);
  return selector;
}

/**
   * Convert yes/no to true/false
   * @param {string} str what to convert
   * @return {boolean} converted
   * */
function yesNoToBool(str) {
  const strHere = str.toLowerCase();
  if (strHere === 'yes') {
    return true;
  } if (strHere === 'no') {
    return false;
  }
  return strHere.toString() === 'true';
}

/**
   * Converts card expiration date from 'MM/YYYY' format to 'MMYYYY' format
   * @param {string} initial card expiration date in initial format
   * @returns {string} converted card expiration date
   */
function convertCardExpiration(initial) {
  return initial.replace('/', '');
}

module.exports = {
  transformSelectors,
  fromPattern,
  yesNoToBool,
  convertCardExpiration,
  fromTemplate,
};
