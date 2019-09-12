const { By } = require('selenium-webdriver');
const { Button } = require('../../../framework/elements/button');

module.exports = {
  itemNameLocator: By.xpath('//a[@class="Controls"]'),
  comparisonRowLocator: By.xpath('//tr[contains(@id, "ComparisonChartNew1_r")]'),
  Compare: new Button(By.xpath('//a[contains(@id, "Compare1")]'), 'Button Compare'),
  'Show Full List': new Button(By.xpath('//a[contains(@id, "Compare1")]'), 'Button Show Full List'),
  'Comparison Item': {
    selector: '%1$s/td/a[text() = "%2$s"]',
    type: 'xpath',
  },
};
