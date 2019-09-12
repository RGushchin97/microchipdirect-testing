const { By } = require('selenium-webdriver');
const { Label } = require('../../../framework/elements/label');

module.exports = {
  'High Voltage Interface': {
    'Depletion - Mode N-Channel': new Label(By.xpath('//a[contains(@href, "branchId=90231")]'), 'Depletion - Mode N-Channel'),
  },
};
