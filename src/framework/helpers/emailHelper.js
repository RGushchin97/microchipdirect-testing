const Imap = require('imap-simple');
const log = require('../logger');

/* eslint-disable max-statements */
/**
   * Retrieve email(s) by search criteria
   * @param {Object} config configuration to use for connection to email server
   * @param {Object} searchCriteria criteria to search email(s) by
   * @param {Object} fetchOptions email(s) fetch options
   */
async function getEmails(config, searchCriteria, fetchOptions) {
  const connection = await Imap.connect(config);
  let searchResult;
  try {
    await connection.openBox('INBOX');
    searchResult = await connection.search(searchCriteria, fetchOptions);
  } catch (error) {
    log(`Error occurred while retrieving emails: ${error}`, 'FATAL');
    throw error;
  } finally {
    connection.end();
  }
  return searchResult;
}
/* eslint-enable max-statements */

/**
   * Retrieve email(s) body by recipient and subject
   * @param {Object} config configuration to use for connection to email server
   * @param {string} recipient recipient of the email(s)
   * @param {string} subject subject of the email(s)
   */
async function getEmailsByRecipientAndSubject(config, recipient, subject) {
  const searchCriteria = [['HEADER', 'TO', recipient], ['HEADER', 'SUBJECT', subject]];
  const fetchOptions = {
    bodies: ['1', 'HEADER', 'TEXT'],
    markSeen: false,
  };
  const emails = await getEmails(config, searchCriteria, fetchOptions);
  return emails.map((email) => email.parts[0].body);
}

module.exports = {
  getEmails,
  getEmailsByRecipientAndSubject,
};
