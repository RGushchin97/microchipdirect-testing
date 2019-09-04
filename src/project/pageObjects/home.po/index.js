const selectors = require('./constants');
const {click, scrollToElement, hover} = require("../../../framework/elements/baseElement");
const { fromPattern, transformSelectors } = require("../../../framework/helpers/transformers");
const log = require('../../../framework/logger');
const {} = require("../../../framework/elements/baseElement");

class HomePage {

  async selectCategoryFromCard(category, card) {
    const transformedSelectors = transformSelectors(selectors);
    const cardNumber = this.getCardNumber(card);
    const cardSelector = fromPattern(transformedSelectors['Card'], cardNumber);
    // TODO hover in Chrome!
    await scrollToElement(cardSelector);
    await hover(cardSelector);
    const categoryNumber = this.getCategoryNumber(category);
    log('CARD: ' + JSON.stringify(cardSelector));
    const categorySelector = fromPattern(transformedSelectors['Category'], cardSelector.selector, categoryNumber);
    log('CATEGORY: ' + JSON.stringify(categorySelector));
    await click(categorySelector);
  }

  getCardNumber(card) {
    let number;
    switch (card) {
      case 'Analog': number = '2'; break;
      default: throw new Error(`Card '${card}' is not specified`);
    }
    return number;
  }

  getCategoryNumber(category) {
    let number;
    switch (category) {
      case 'Ultrasound Products': number = 6; break;
      default: throw new Error(`Category '${category}' is not specified`);
    }
    return number;
  }
}

module.exports = {
  HomePage,
};
