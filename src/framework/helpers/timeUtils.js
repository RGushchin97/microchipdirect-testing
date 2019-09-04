const moment = require('moment');

const NUMBER_OF_DAYS_IN_WEEK = 7;
const DECEMBER = 12;
const START_OF_CHRISTMAS_WEEK = 25;

/**
 * add days to original date
 * @param {Date} date initial date
 * @param {number} days number of days
 * @return {Date} resulted days
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * is Christmas Week Within Period
 * @param {Date} startDate start date
 * @param {Date} endDate end date
 * @return {Date} resulted days
 */
function isChristmasWeekWithinPeriod(startDate, endDate) {
  const dateToCheck = new Date(new Date(Date.now()).getFullYear(), DECEMBER, START_OF_CHRISTMAS_WEEK);
  return dateToCheck >= startDate && dateToCheck < endDate;
}

/**
 * convert to innovate date format
 * @param {Date} date date
 * @return {string} result
 */
function asInnovateDateFormat(date) {
  return moment(date).format('DD-MMM-YYYY');
}

/**
 * Transroms selectors
 * @param {string} term selector to transform
 * @return {string} transformed selector
 * */
function transformTermToZuoraLike(term) {
  const intTerm = parseInt(term, 10);
  return `${intTerm} Week(s)`;
}

/**
 * convert to Salesforce date format
 * @param {Date} date date
 * @return {string} result
 */
function asSalesforceDateFormat(date) {
  return moment(date).format('DD/MM/YYYY');
}

/**
 * shorten date from YYYY-MM-DDThh:mm:ss.fff to YYYY-MM-DD
 * @param {string} date date
 * @return {string} result
 */
function shortenDate(date) {
  return date.split('T')[0];
}

/**
 *
 * @param {int} termLength term length
 * @param {string} termUnit term unit
 * @returns {Date} date in past
 */
function getStartDateInPast(termLength, termUnit) {
  let date;
  if (termUnit === 'weeks') {
    date = addDays(Date.now(), -termLength * NUMBER_OF_DAYS_IN_WEEK);
  }
  return date;
}

module.exports = {
  addDays,
  isChristmasWeekWithinPeriod,
  asInnovateDateFormat,
  transformTermToZuoraLike,
  asSalesforceDateFormat,
  shortenDate,
  getStartDateInPast,
};
