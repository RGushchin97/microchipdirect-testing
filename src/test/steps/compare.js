const { HomePage } = require('../../project/pageObjects/home.po');
const { When } = require('cucumber');
const log = require('../../framework/logger');
const { CategoryTablePage } = require('../../project/pageObjects/category-table.po');

When(/^I select '(.*)' from '(.*)' card footer$/, async function (category, card) {
  const homePage = new HomePage();
  await homePage.selectCategoryFromCard(category, card);
});
When(/^I select '(.*)' from '(.*)' table card$/, async function (option, table) {
  const categoryTablePage = new CategoryTablePage();
  await categoryTablePage.selectOption(option, table);
});
