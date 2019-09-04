const fs = require('fs');
const json2csv = require('json2csv').parse;
const log = require('../logger');

/**
 * Saving data into file
 * @param {string} path full path to file
 * @param {string} filename name of the file
 * @param {string} data data to be stored in file
 */
function saveStringToFile(path, filename, data) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {
      recursive: true,
    });
  }
  try {
    fs.writeFileSync(`${path}/${filename}`, data);
  } catch (error) {
    log(`Error occurred while saving data to file: ${error}`, 'FATAL');
  }
}

/**
   * Converting object to csv
   * @param {Object} object object to be converted to csv
   * @returns {string} csv
   */
function objectToCsv(object) {
  const headers = Object.keys(object[0]);
  const opts = {
    headers,
  };
  return json2csv(object, opts);
}

module.exports = {
  saveStringToFile,
  objectToCsv,
};
