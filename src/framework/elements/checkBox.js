const log = require('../logger');
const ElementState = require('./elementState');
const { waitAndAssertState, jsClick } = require('./baseElement');

/**
 * set Checkbox State
 * @param {Object} selector element selector
 * @param {string} state state to setting
 * @returns {Promise<void>} result of setting
 */
async function setCheckboxState(selector, state) {
  log(`Setting "${state}" into "${selector.name}" checkbox`);
  const element = await waitAndAssertState(selector, ElementState.PRESENT);
  const isSelected = await element.isSelected();
  if (state !== isSelected) {
    await jsClick(selector);
  }
}

/**
 * get Checkbox State
 * @param {Object} selector element selector
 * @returns {boolean} checkbox state
 */
async function getCheckboxState(selector) {
  log(`Getting state of "${selector.name}" checkbox`);
  const element = await waitAndAssertState(selector, ElementState.EXISTS);
  return element.isSelected();
}

module.exports = {
  setCheckboxState,
  getCheckboxState,
};
