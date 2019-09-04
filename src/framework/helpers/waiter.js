const interval = require('interval-promise');
const log = require('../logger');

const POLLING_INTERVAL = 100;
const TIMEOUT_MILLISECONDS = 60000;

/* eslint-disable max-statements */
/**
   * Wait for function success
   * @param {function} condition function for execution
   * @param {number} pollingInterval time before function re-calling
   * @param {number} timeoutMilliseconds overall timeout
   * @param {string} infoMessage info message about condition
   * @param {boolean} failOnTimeout fail or not fail on timeout exceeding
   * @returns {Promise<void>} result of waiting
   */
async function waitUntil(condition, {
  pollingInterval = POLLING_INTERVAL, timeoutMilliseconds = TIMEOUT_MILLISECONDS, infoMessage = 'unknown', failOnTimeout = true,
} = {
}) {
  log(`Waiting for ${infoMessage} event`);
  const start = Date.now();
  const timesToRepeat = timeoutMilliseconds / pollingInterval;
  let stoppedExternally = false;
  try {
    await interval(async (iteration, stop) => {
      stoppedExternally = await condition();
      if (stoppedExternally) {
        stop();
      }
      if (Date.now() - start > timeoutMilliseconds) {
        stop();
      }
    }, pollingInterval, {
      iterations: timesToRepeat,
      stopOnError: true,
    });
  } catch (err) {
    log(err);
  }
  if (!stoppedExternally && failOnTimeout) {
    throw Error(`Waiting timeout for ${infoMessage} event`);
  }
  return stoppedExternally;
}

module.exports = {
  waitUntil,
};
