const uuid = require('uuid/v4');

const DEFAULT_LENGTH = 12;

/**
 * Gets random string of specified length
 * @param {int} length length of random postfix
 * @returns {string} random string
 */
function getRandomPostfix(length = DEFAULT_LENGTH) {
  const value = uuid();
  return value.substr(value.length - length);
}

/**
 * Extract text between tags
 * @param {string} initialString input string
 * @returns {string} text from tags
 */
function extractTagText(initialString) {
  const re = new RegExp('>(.*)<', 'g');
  const match = re.exec(initialString);
  return match[1];
}

/**
 * Removes html tags from a string
 * @param {string} initialString input string
 * @param {string} replacement characters to replace tags with
 * @returns {string} string with replaced tags
 */
function replaceTagsFromString(initialString, replacement = ', ') {
  const re = new RegExp('<.+?>', 'g');
  return initialString.replace(re, replacement);
}

module.exports = {
  getRandomPostfix,
  extractTagText,
  replaceTagsFromString,
};
