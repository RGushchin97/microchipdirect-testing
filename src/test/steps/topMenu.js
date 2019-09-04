const { When } = require('cucumber');

const {
  selectMenuItem,
} = require('../../project/customElements');

When(/^I select '(.*)' option from '(.*)' menu$/, async (itemName, menuName) => {
  await selectMenuItem(menuName, itemName);
});
