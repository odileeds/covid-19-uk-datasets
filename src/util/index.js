const { getUrlAsStream } = require('./getUrlAsStream');
const { grabCsv } = require('./grabCsv');
const { writeCsv } = require('./writeCsv');
const { dataPath } = require('./dataPath');

const identity = x => x;

module.exports = {
  dataPath,
  getUrlAsStream,
  grabCsv,
  identity,
  writeCsv,
}
