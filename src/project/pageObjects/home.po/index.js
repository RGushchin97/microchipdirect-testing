const { BasePage } = require('../../../framework/base-page');
const elements = require('./constants');
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
    super(elements);
  }

  /**
   * select card
   * @param {string} card name of card to select
   * @returns {Promise<void>} result select
   */
  async selectCard(card) {
    const lblCard = this.elements[card];
    await lblCard.scrollToElement();
    await lblCard.click();
  }
}

module.exports = {
  HomePage,
};
