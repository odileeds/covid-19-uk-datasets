const axios = require("axios");

async function getUrlAsStream(url) {
  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
  });
  return response.data;
}

exports.getUrlAsStream = getUrlAsStream;
