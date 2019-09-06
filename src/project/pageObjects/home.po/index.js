const selectors = require('./constants');
const { click, scrollToElement, hover } = require('../../../framework/elements/baseElement');
const { fromPattern, transformSelectors } = require('../../../framework/helpers/transformers');

class HomePage {

  constructor() {
    this.selectors = transformSelectors(selectors);
  }

  async selectCategoryFromCard(category, card) {
    const cardNumber = this.getCardNumber(card);
    const cardSelector = fromPattern(this.selectors.Card, cardNumber);
    // TODO hover in Chrome!
    await scrollToElement(cardSelector);
    await hover(cardSelector);
    const categoryNumber = this.getCategoryNumber(category);
    const categorySelector = fromPattern(this.selectors.Category, cardSelector.selector, categoryNumber);
    await click(categorySelector);
  }

  async selectCard(card) {
    const cardSelector = fromPattern(this.selectors.Card, this.getCardNumber(card));
    await scrollToElement(cardSelector);
    await click(cardSelector);
  }

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
  }

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
  }
}

module.exports = {
  HomePage,
};
