const { By } = require('selenium-webdriver');
const { Button } = require('../../../framework/elements/button');
const { Label } = require('../../../framework/elements/label');

const selectors = {
  lblPricingItemName: new Label(By.css('.card > .card-body span > strong'), 'Pricing Item Name'),
  btnUpload: new Button(By.css('.card-deck .card:nth-child(3) .btn.btn-danger'), 'Button Upload'),
  stepCardTitleLocatorTemplate: By.css('.card-deck .card:nth-child(%1$s) .card-title'),
  stepCardLocatorTemplate: By.xpath('.//*[contains(@class,"card-deck")]//*[contains(@class,"card")][%1$s]'),
  listGroupTableRowsLocatorTemplate: By.xpath('%1$s//ul/li'),
};

module.exports = {
  ...selectors,
};
