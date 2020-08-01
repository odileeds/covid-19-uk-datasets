const { getUrlAsStream, grabCsv } = require("./util");

async function loadData(url, header = undefined) {
  return grabCsv(await getUrlAsStream(url), { from_line: 2, columns: header });
}

exports.loadData = loadData;
