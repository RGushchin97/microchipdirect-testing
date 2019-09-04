const childProcess = require('child_process');

/**
  * Execute script from file
  * @param {string} pathToFile path to executable file
  * @param {string} args arguments
  */
function executeFile(pathToFile, args) {
  const extension = process.platform === 'win32' ? '.bat' : '.sh';
  childProcess.execFileSync(`${pathToFile}${extension}`, args, {
    stdio: 'inherit',
  });
}

module.exports = {
  executeFile,
};
