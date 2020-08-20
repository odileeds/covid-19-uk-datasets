const axios = require('axios');

async function getHeaderData(url) {
  const res = await axios.get(url);
  const contentLength = res.headers['content-length'];
  let lastModified;
  try {
    lastModified = new Date(res.headers['last-modified']).toISOString();
  } catch(err) {
    lastModified = undefined;
  }
  return {
    contentLength,
    lastModified,
  }
}

exports.getHeaderData = getHeaderData;