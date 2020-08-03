const path = require('path');
const fs = require('fs');
const { grabCsv, writeCsv } = require("./util");

class Metadata {
  constructor() {
    this.metadataPath = path.resolve(path.join(__dirname, '..', 'data', '_metadata.csv'));
    this.metadata = [];
  }
  async readMetadata() {
    const metadataStream = fs.createReadStream(this.metadataPath);
    this.metadata = await grabCsv(metadataStream, {
      columns: true,
    });
  }
  get loaded() {
    return this.metadata.length > 0;
  }
  get latest() {
    return Object.values(this.metadata.reduce((acc, data) => {
      const { datasetName, dateFetched } = data;
      if (!datasetName) return acc;
      if (!acc[datasetName]) acc[datasetName] = data;
      if (dateFetched > acc[datasetName].dateFetched) acc[datasetName] = data;
      return acc;
    }, {}));
  }
  push(data) {
    this.metadata.push(data);
  }
  async writeMetadata() {
    return writeCsv(this.metadata, this.metadataPath);
  }
  comparePrevious({ datasetName, headerFields }) {
    const previous = this.metadata
      .filter(m => m.datasetName === datasetName)
      .sort((m, n) => {
        if (m.dateFetched < n.dateFetched) return 1;
        if (m.dateFetched > n.dateFetched) return -1;
        return 0;
      });
    return previous[0].headerFields === headerFields;
  }
}

const metadata = new Metadata();
exports.metadata = metadata;

module.exports = exports;
