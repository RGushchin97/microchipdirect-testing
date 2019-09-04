const { transformSelectors } = require('../../../framework/helpers/transformers');
const selectors = transformSelectors(require('./constants'));
const { click } = require('../../../framework/elements');

/**
 * Accept Cookie banner
 */
async function accept() {
  await click(selectors['Cookie Banner Accept']);
}

module.exports = {
  accept,
};
