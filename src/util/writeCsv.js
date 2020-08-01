const fs = require('fs');
const stringify = require('csv-stringify');

async function writeCsv(data, csvPath) {
  const file = fs.createWriteStream(csvPath);
  const stringifier = stringify({
    header: true,
    quoted: true,
  });
  stringifier.pipe(file);
  data.map(x => stringifier.write(x));
  stringifier.end();
}

exports.writeCsv = writeCsv;
