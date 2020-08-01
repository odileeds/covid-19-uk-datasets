const path = require('path');

function dataPath(filename) {
  return path.resolve(path.join(__dirname, '..', '..', '/data/', filename));
}

exports.dataPath = dataPath;
