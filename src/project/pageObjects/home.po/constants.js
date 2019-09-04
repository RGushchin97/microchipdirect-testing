module.exports = {
  'E-mail and Phone Support': {
    selector: '//a[@href="/SupportEmail.aspx"]',
    type: 'xpath',
  },
  'Card': {
    selector: '#product-cards > div > div:nth-child(%1$s)',
    type: 'css',
  },
  'Category': {
    selector: `%1$s > div.card-footer > span:nth-child(%2$s) > a`,
    type: 'css',
  }
};
