const { BasePage } = require('../../../framework/base-page');
const { getCategoryNumber } = require('./constants');
const { getCardNumber } = require('./constants');
const { selectors } = require('./constants');
const { click, scrollToElement, hover } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');

/**
 * Page object class for working with home page
 */
class HomePage extends BasePage {
  /**
   * represents home page
   * @constructor
   */
  constructor() {
    super(selectors);
  }

  /**
   * hover and select category from card
   * @param {string} category category name to select
   * @param {string} card card name to hover
   * @returns {Promise<void>} result select
   */
  async selectCategoryFromCard(category, card) {
    const cardNumber = getCardNumber(card);
    const cardSelector = fromPattern(this.selectors.Card, cardNumber);
    // TODO hover in Chrome!
    await scrollToElement(cardSelector);
    await hover(cardSelector);
    const categoryNumber = getCategoryNumber(category);
    const categorySelector = fromPattern(this.selectors.Category, cardSelector.selector, categoryNumber);
    await click(categorySelector);
  }

  /**
   * select card
   * @param {string} card name of card to select
   * @returns {Promise<void>} result select
   */
  async selectCard(card) {
    const cardSelector = fromPattern(this.selectors.Card, getCardNumber(card));
    await scrollToElement(cardSelector);
    await click(cardSelector);
  }
}

module.exports = {
  HomePage,
};
