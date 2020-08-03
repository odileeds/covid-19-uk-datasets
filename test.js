const { metadata } = require('./src/metadataManager');

async function doIt() {
  await metadata.readMetadata();
  metadata.compress();
  await metadata.writeMetadata();
}

doIt();