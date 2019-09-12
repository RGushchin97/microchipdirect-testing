const { transformSelectors } = require('../../framework/helpers/transformers');
const log = require('../../framework/logger');
const { Button } = require('../../framework/elements');
const { click, hover, scrollToElement } = require('../../framework/elements/baseElement');

/**
 * get item index
 * @param {string} itemName item name to select
 * @returns {object} locator
 */
const getItemHref = (itemName) => {
  switch (itemName) {
  case 'Programming Cost Lookup':
    return '/programming/price-lookup';
  default:
    throw new Error(`${itemName} is not registered`);
  }
};

/**
 * get menu index
 * @param {string} menuName menu item to select
 * @returns {object} locator
 */
const getMenuIndex = (menuName) => {
  const VALUE_ADDED_SERVICES = 2;
  const PROGRAMMING_SERVICES = 3;
  switch (menuName) {
  case 'VALUE ADDED SERVICES':
    return VALUE_ADDED_SERVICES;
  case 'Programming services':
    return PROGRAMMING_SERVICES;
  default:
    throw new Error(`${menuName} is not registered`);
  }
};

/**
 * select menu item
 * @param {string} menuName menu item to select
 * @param {string} itemName list item to select
 * @returns {Promise<void>} result of setting
 */
const selectMenuItem = async (menuName, itemName) => {
  log(`Selecting "${itemName}" item from "${menuName}" menu button`);
  const menuButton = {
    'Top Menu Button': {
      selector: `//*[@id="header-nav"]//ul[contains(@class, "top-level")]/li[${getMenuIndex(menuName)}]`,
      type: 'xpath',
    },
  };
  const lblMenu = new Button(transformSelectors(menuButton)['Top Menu Button'].locator, `Menu Label ${menuName}`);
  await lblMenu.scrollToElement();
  await lblMenu.hover();
  const btnMenu = new Button(transformSelectors({
    'Menu Button item': {
      selector: `${menuButton['Top Menu Button'].selector}//a[@href="${getItemHref(itemName)}"]`,
      type: 'xpath',
    },
  })['Menu Button item'].locator, `Menu Button ${itemName}`);
  await btnMenu.click();
};

module.exports = {
  selectMenuItem,
};
