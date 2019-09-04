/**
 * Class for reading test data
 */
class DataReader {
  /**
   * Set test data source
   * @param {object} source Test Data object
   */
  static setSource(source) {
    DataReader.source = source;
  }

  /**
   * Get test data by path
   * @param {string} path test data path with "'s" separator
   * @returns {Object} test data value
   */
  static getObject(path) {
    const arr = path.split('\'s');
    let obj = DataReader.source;
    for (let i = 0; i < arr.length; i += 1) {
      obj = obj[arr[i].trim()];
    }
    return obj;
  }

  /**
   * Set test data by path and value
   * @param {string} path test data path with "'s" separator
   * @param {string} value value to set
   */
  static setObject(path, value) {
    const arr = path.split('\'s');
    let obj = DataReader.source;
    while (arr.length > 1) {
      const key = arr.shift().trim();
      if (!obj[key]) {
        obj[key] = {
        };
      }
      obj = obj[key];
    }
    obj[arr.shift().trim()] = value;
  }
}

module.exports = DataReader;
