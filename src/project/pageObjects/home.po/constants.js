const { By } = require('selenium-webdriver');
const { Label } = require('../../../framework/elements/label');

module.exports = {
  Analog: new Label(By.css('#product-cards > div > div:nth-child(2)'), 'Analog'),
};
