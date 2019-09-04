const common = '--fail-fast ';

module.exports = {
  default: `${common}--format summary`,
  dry: `${common}--dry-run`,
  progress: `${common}--format progress`,
};
