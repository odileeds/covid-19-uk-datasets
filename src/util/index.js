const { getUrlAsStream } = require('./getUrlAsStream');
const { grabCsv } = require('./grabCsv');
const { writeCsv } = require('./writeCsv');
const { dataPath } = require('./dataPath');
const { getModificationTime } = require('./getModificationTime');

const identity = x => x;

module.exports = {
  dataPath,
  getModificationTime,
  getUrlAsStream,
  grabCsv,
  identity,
  writeCsv,
}
