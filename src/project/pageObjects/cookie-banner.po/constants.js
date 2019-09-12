const { By } = require('selenium-webdriver');
const { Button } = require('../../../framework/elements/button');

module.exports = {
  cookieBannerAccept: new Button(By.css('#cookie-banner button'), 'Cookie Banner Accept'),
};
