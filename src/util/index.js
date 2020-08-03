const { getUrlAsStream } = require('./getUrlAsStream');
const { grabCsv } = require('./grabCsv');
const { writeCsv } = require('./writeCsv');
const { dataPath } = require('./dataPath');
const { getHeaderData } = require('./getHeaderData');

const identity = x => x;

module.exports = {
  dataPath,
  getHeaderData,
  getUrlAsStream,
  grabCsv,
  identity,
  writeCsv,
}
