const selectors = require('./constants');
const { Awesomplete } = require('../../customElements/awesomplete');

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
    const awesomplete = new Awesomplete(selectors['List id']);
    await awesomplete.searchAndSelectItem(searchText, item);
    this.itemName = awesomplete.getSelectedItemName();
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
