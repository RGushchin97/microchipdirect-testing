module.exports = {
  'Item': {
    selector: '(//table[contains(@class, "striped")]//tr[contains(., "%1$s")])[%2$s]',
    type: 'xpath',
  },
  'Item Checkbox': {
    selector: '%1$s/td/input',
    type: 'xpath',
  },
  'Item Name': {
    selector: '%1$s/td[contains(@id, "FamilyName")]/a[@class="Controls"]',
    type: 'xpath',
  },
  'Compare': {
    selector: '//a[contains(@id, "Compare1")]',
    type: 'xpath',
  },
  'Show Full List': {
    selector: '//a[contains(@id, "Compare1")]',
    type: 'xpath',
  },
  'Comparison Row': {
    selector: '//tr[contains(@id, "ComparisonChartNew1_r")]',
    type: 'xpath',
  },
  'Comparison Item': {
    selector: '%1$s/td/a[text() = "%2$s"]',
    type: 'xpath',
  },
};
