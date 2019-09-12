module.exports = {
  selectors: {
    'E-mail and Phone Support': {
      selector: '//a[@href="/SupportEmail.aspx"]',
      type: 'xpath',
    },
    Card: {
      selector: '#product-cards > div > div:nth-child(%1$s)',
      type: 'css',
    },
    Category: {
      selector: '%1$s > div.card-footer > span:nth-child(%2$s) > a',
      type: 'css',
    },
  },

  // eslint-disable-next-line require-jsdoc
  getCardNumber(card) {
    let number;
    switch (card) {
    case 'Analog':
      number = '2';
      break;
    default:
      throw new Error(`Card '${card}' is not specified`);
    }
    return number;
  },

  // eslint-disable-next-line require-jsdoc
  getCategoryNumber(category) {
    let number;
    switch (category) {
    case 'Ultrasound Products':
      number = '6';
      break;
    default:
      throw new Error(`Category '${category}' is not specified`);
    }
    return number;
  },
};
