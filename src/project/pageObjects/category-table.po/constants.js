module.exports = {
  selectors: {
    Table: {
      selector: '//div[contains(@id, "divCol%1$s")]/div[%2$s]',
      type: 'xpath',
    },
    Option: {
      selector: '%1$s/ul/li[%2$s]',
      type: 'xpath',
    },
  },
  // eslint-disable-next-line require-jsdoc
  getNumbersForTable(table) {
    let numbers;
    switch (table) {
    case 'High Voltage Interface':
      numbers = ['2', '3'];
      break;
    default:
      throw new Error(`Table ${table} is not specified.`);
    }
    return numbers;
  },
  // eslint-disable-next-line require-jsdoc
  getNumberForOption(option) {
    let number;
    switch (option) {
    case 'Depletion - Mode N-Channel':
      number = '1';
      break;
    default:
      throw new Error(`Option ${option} is not specified.`);
    }
    return number;
  },
};
