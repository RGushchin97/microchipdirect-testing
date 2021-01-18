/**
 * Page object base class
 */
class BasePage {
  /**
   * set own elements
   * @param {object} elements own elements
   */
  constructor(elements) {
    if (new.target === BasePage) {
      throw new TypeError('Cannot construct BasePage class directly');
    }
    this.elements = elements;
  }
}

module.exports = {
  BasePage,
};
