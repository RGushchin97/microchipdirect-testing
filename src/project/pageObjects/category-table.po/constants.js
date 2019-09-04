module.exports = {
  'Table': {
    selector: '//div[contains(@id, "divCol%1$s")]/div[%2$s]',
    type: 'xpath',
  },
  'Option': {
    selector: '%1$s/ul/li[%2$s]',
    type: 'xpath',
  }
};
