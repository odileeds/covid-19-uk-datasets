const axios = require('axios');

async function getModificationTime(url) {
  const res = await axios.head(url);

  try {
    return new Date(res.headers['last-modified']).toISOString();
  } catch(err) {
    return undefined;
  }
}

exports.getModificationTime = getModificationTime;