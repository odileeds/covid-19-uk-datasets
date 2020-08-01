const parse = require("csv-parse");

function grabCsv(data, parserOptions = {}) {
  const parser = parse({ ...parserOptions });
  let result = [];
  return new Promise((resolve, reject) => {
    data
      .pipe(parser)
      .on('readable', () => {
        let record;
        while (record = parser.read()) {
          result.push(record);
        }
      })
      .on('end', () => resolve(result))
      .on('error', reject);
  });
}

exports.grabCsv = grabCsv;
