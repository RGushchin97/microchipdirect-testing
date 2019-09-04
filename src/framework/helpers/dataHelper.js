const DAYS_IN_WEEK = 7;
const NUMBER_DECIMAL_PLACES = 2;

/**
* Calculate the amount of refund
* @param {double} fullCost full cost of subscription
* @param {int} termInWeeks subscription term in weeks
* @param {int} daysSpent number of days spent since subscription start date
* @return {double} resulted refund amount
*/
function getRefundAmount(fullCost, termInWeeks, daysSpent) {
  return (fullCost - (daysSpent * (fullCost / (termInWeeks * DAYS_IN_WEEK)))).toFixed(NUMBER_DECIMAL_PLACES);
}

module.exports = {
  getRefundAmount,
};
