const { getUrlAsStream, grabCsv } = require("./util");

async function readHeader(url) {
  const csv = await grabCsv(await getUrlAsStream(url), { to_line: 1 });
  return csv[0];
}
exports.readHeader = readHeader;
