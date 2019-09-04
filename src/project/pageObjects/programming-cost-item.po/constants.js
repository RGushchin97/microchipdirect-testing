const selectors = {
  'Showing Pricing For Part Number': {
    selector: '.card > .card-body span > strong',
    type: 'css',
  },
  'Step Card Title': {
    selector: '.card-deck .card:nth-child(%1$s) .card-title',
    type: 'css',
  },
  'Step Card': {
    selector: '//*[contains(@class,"card-deck")]//*[contains(@class,"card")][%1$s]',
    type: 'xpath',
  },
  'List Group Table Rows': {
    selector: '%1$s//ul/li',
    type: 'xpath',
  },
  'List Group Table Column': {
    selector: '%1$s//*[contains(@class,"row")]/*[contains(@class, "col") and text()="%2$s"]',
    type: 'xpath',
  },
  'Step Card Upload Button': {
    selector: '.card-deck .card:nth-child(3) .btn.btn-danger',
    type: 'css',
  },
};

module.exports = {
  ...selectors,
};
