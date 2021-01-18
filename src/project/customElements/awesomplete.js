const { By } = require('selenium-webdriver');
const log = require('../../framework/logger');
const { Label } = require('../../framework/elements/label');
const { TextBox } = require('../../framework/elements/textBox');

/**
 * Class that represents custom text box with dropdown - Awesomplete
 */
class Awesomplete {
  /**
   * represents awesomplete
   * @param {string} listAreaId value os aria-owns attribute
   */
  constructor(listAreaId) {
    this.listAreaId = listAreaId;
  }

  /**
   * get autocomplete
   * @returns {TextBox} result autocomplete text box
   */
  getAutocompleteTextBox() {
    return new TextBox(By.css(`.awesomplete > input[aria-owns="${this.listAreaId}"]`), 'Awesomplete Autocomplete');
  }

  /**
   * get autocomplete item
   * @param {number} index autocomplete item index
   * @returns {Label} result item label
   */
  getItem(index) {
    return new Label(By.css(`.awesomplete > #${this.listAreaId} > li:nth-child(${index})`),
      `Awesomplete Item [${index}]`);
  }

  /**
   * get input value from text box
   * @returns {*|!Promise<?string>|string} result text input value
   */
  getSearchValue() {
    return this.getAutocompleteTextBox()
      .getTextboxValue();
  }

  async search(searchText) {
    log(`Send search text '${searchText}' to awesomplete text box`);
    const txbSearch = this.getAutocompleteTextBox();
    return txbSearch.setText(searchText);
  }

  async clickItem(index) {
    const item = this.getItem(index);
    await item.waitAndAssertIsExists();
    log(`Try click '${item.name}'`);
    if (await item.isPresent()) {
      this.selectedItemName = await item.getText();
      return item.click();
    }
    throw new Error(`Can't locate Awesomplete item with locator ${item.getLocator()}`);
  }

  async searchAndSelectItem(searchText, index) {
    log(`Selecting "${index}" item in autocomplete from Autocomplete after input "${searchText}" text `);
    await this.search(searchText);
    await this.clickItem(index);
  }

  getSelectedItemName() {
    return this.selectedItemName;
  }
}

module.exports = {
  Awesomplete,
};
