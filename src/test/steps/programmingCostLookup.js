const { When, Then } = require('cucumber');
const { assert } = require('chai');
const { ProgrammingCostSearchPage } = require('../../project/pageObjects/programming-cost-search.po');
const { ProgrammingCostItemPage } = require('../../project/pageObjects/programming-cost-item.po');

When(/^I select '(.*)' option after search by '(.*)' on Programming Cost Lookup remembering item name as '(.*)'$/, async (item, text, key) => {
  const programmingCostSearchPage = new ProgrammingCostSearchPage();
  await programmingCostSearchPage.searchItem(text, item);
  this[key] = programmingCostSearchPage.getItemName();
});

Then(/^Result for '(.*)' is shown$/, async (key) => {
  const text = await new ProgrammingCostItemPage().getItemPricingName();
  assert.equal(text, this[key], 'Showing Pricing For Part Number should be shown.');
});

Then(/^Step (.*) '(.*)' label is shown$/, async (step, label) => {
  const text = await new ProgrammingCostItemPage().getItemPricingLabelText(step);
  assert.equal(text, label, `${label} should be shown.`);
});

Then(/^Step (.*) table has data$/, async (step) => {
  const hasRowsValue = await new ProgrammingCostItemPage().isItemHasRowsValue(step);
  assert.isTrue(hasRowsValue, `Step ${step} should has data in table.`);
});

Then(/^Step 3 has enabled Upload button$/, async () => {
  const isPresentValue = await new ProgrammingCostItemPage().isUploadButtonPresent();
  assert.isTrue(isPresentValue, 'Upload Button should be shown');
  const isEnabledValue = await new ProgrammingCostItemPage().isUploadButtonEnabled();
  assert.isTrue(isEnabledValue, 'Upload button should be enabled');
});
