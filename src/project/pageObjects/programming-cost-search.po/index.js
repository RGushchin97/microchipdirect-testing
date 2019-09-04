const selectors = require('./constants');
const { selectAwesompleteItem } = require('../../customElements/awesomeplete');
/**
 * Page for searching cost of programming
 */
class ProgrammingCostSearchPage {
  /**
   * Search and select item
   * @param {string} searchText Text for searching
   * @param {number} item Number item that will be selected
   */
  async searchItem(searchText, item) {
    await selectAwesompleteItem(selectors['List id'], searchText, item, (name) => { this.itemName = name; });
  }

  /**
   * Get item's name that was selected from dropdown
   * @returns {string} Item name
   */
  getItemName() {
    return this.itemName;
  }
}

module.exports = {
  ProgrammingCostSearchPage,
};
