const path = require('path');
const fs = require('fs');
const { grabCsv, writeCsv } = require("./util");

class Metadata {
  constructor() {
    this.metadataPath = path.resolve(path.join(__dirname, '..', 'metadata.csv'));
    this.metadata = [];
  }
  async readMetadata() {
    const metadataStream = fs.createReadStream(this.metadataPath);
    this.metadata = await grabCsv(metadataStream, {
      columns: true,
    });
  }
  push({ datasetName, dateFetched, headerFields }) {
    this.metadata.push({ datasetName, dateFetched, headerFields });
  }
  async writeMetadata() {
    return writeCsv(this.metadata, this.metadataPath);
  }

}

const metadata = new Metadata();
exports.metadata = metadata;
