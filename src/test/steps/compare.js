const { assert } = require('chai');
const { When } = require('cucumber');
const { Then } = require('cucumber');
const { By } = require('selenium-webdriver');
const { HomePage } = require('../../project/pageObjects/home.po');
const log = require('../../framework/logger');
const { CompareListPage } = require('../../project/pageObjects/compare-list.po');
const { CategoryTablePage } = require('../../project/pageObjects/category-table.po');
const browser = require('../../framework/browser');

When(/^I select '(.*)' from '(.*)' card footer$/, async (category, card) => {
  const homePage = new HomePage();
  await homePage.selectCategoryFromCard(category, card);
});

When(/^I select '(.*)' from '(.*)' table card$/, async (option, table) => {
  const categoryTablePage = new CategoryTablePage();
  await categoryTablePage.selectOption(option, table);
});

When(/^I select '(.*)' card$/, async (card) => {
  const homePage = new HomePage();
  await homePage.selectCard(card);
});

When(/^I select '(.*)' item with cost '(.*)' from results table remembering item name as '(.*)'$/, async (number, cost, key) => {
  const compareListPage = new CompareListPage();
  await compareListPage.selectItem(number, cost);
  this[key] = await compareListPage.getSelectedItemName();
  log(`${number} item's name with cost ${cost} (name = '${this[key]}') is remembered as '${key}'.`);
});

When(/^I click button Compare$/, async () => {
  const compareListPage = new CompareListPage();
  await compareListPage.clickCompare();
});

Then(/^Only '(.*)' items are in table$/, async (count) => {
  const compareListPage = new CompareListPage();
  const comparisonsCount = await compareListPage.getComparisonsCount();
  assert.equal(count, comparisonsCount, `Comparisons table does not contain ${count} items`);
});
Then(/^Item '(.*)' is in table$/, async (key) => {
  const compareListPage = new CompareListPage();
  const itemName = this[key];
  await compareListPage.waitForTableItemIsDisplayed(itemName);
});
When(/^I click button Show Full List$/, async () => {
  const compareListPage = new CompareListPage();
  await compareListPage.clickShowFullList();
});
Then(/^List of items names '(.*)' is shown$/, async (key) => {
  const compareListPage = new CompareListPage();
  const actualList = await compareListPage.getNamesList();
  assert.deepEqual(actualList, this[key], `List of items names ${key} is not shown`);
});
Then(/^Button Compare is available$/, async () => {
  const compareListPage = new CompareListPage();
  await compareListPage.waitForButtonCompareIsAvailable();
});
When(/^I remember items names list as '(.*)'$/, async (key) => {
  const compareListPage = new CompareListPage();
  this[key] = await compareListPage.getNamesList();
  log(`Items names list [${this[key]}] is remembered as '${key}'`);
});
