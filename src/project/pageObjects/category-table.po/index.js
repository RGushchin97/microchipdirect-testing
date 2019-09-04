const selectors = require('./constants');
const { click } = require('../../../framework/elements/baseElement');
const { fromPattern } = require('../../../framework/helpers/transformers');
const { transformSelectors } = require('../../../framework/helpers/transformers');

class CategoryTablePage {
  constructor() {
    this.formattedSelectors = transformSelectors(selectors);
  }

  async selectOption(option, table) {
    const tableNumbers = this.getNumbersForTable(table);
    const [column, number] = tableNumbers;
    const tableSelector = fromPattern(this.formattedSelectors['Table'], column, number);
    const optionSelector = fromPattern(this.formattedSelectors['Option'], tableSelector.selector, this.getNumberForOption(option));
    await click(optionSelector);
  }

  getNumbersForTable(table) {
    let numbers;
    switch (table) {
    case 'High Voltage Interface':
      numbers = [2, 3];
      break;
    default:
      throw new Error(`Table ${table} is not specified.`);
    }
    return numbers;
  }

  getNumberForOption(option) {
    let number;
    switch (option) {
    case 'Depletion - Mode N-Channel':
      number = 1;
      break;
    default:
      throw new Error(`Option ${option} is not specified.`);
    }
    return number;
  }
}

module.exports = {
  CategoryTablePage,
};
