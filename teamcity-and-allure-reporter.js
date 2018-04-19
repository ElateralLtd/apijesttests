const teamcityReporter = require('jest-teamcity-reporter');
const allureReporter = require('jest-allure-reporter');

function teamcityAndAllureReporter(results) {
  teamcityReporter(results);
  allureReporter(results);
  return results;
}

module.exports = teamcityAndAllureReporter;
