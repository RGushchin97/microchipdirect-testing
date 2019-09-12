const elements = require('./constants');

/**
 * Accept Cookie banner
 */
async function accept() {
  await elements.cookieBannerAccept.click();
}

module.exports = {
  accept,
};
