const { getHeaderData, identity, writeCsv, dataPath } = require("./util");
const mappers = require('./mappers');

const { readHeader } = require("./readHeader");
const { loadData } = require("./loadData");
const { metadata } = require("./metadataManager");
const { buildReport } = require("./report");
const { scotlandTransform } = require('./transformers');

const sources = [
  {
    geo: "England",
    measure: "cases",
    url: "https://coronavirus.data.gov.uk/downloads/csv/coronavirus-cases_latest.csv",
    mapper: mappers.en,
    output: 'england-cases.csv'
  },
  {
    geo: "Scotland",
    measure: "cases",
    url: "https://raw.githubusercontent.com/DataScienceScotland/COVID-19-Management-Information/master/COVID19%20-%20Daily%20Management%20Information%20-%20Scottish%20Health%20Boards%20-%20Cumulative%20cases.csv",
    output: 'scotland-cases.csv',
    transformer: scotlandTransform,
  }
];

async function process({ geo, measure, url, transformer = identity, mapper = identity, output}) {
  const dateFetched = (new Date).toISOString();
  const datasetName = `${geo}-${measure}`;
  const thisRecord = {
    datasetName,
    dateFetched,
  }
  try {
    const headerData = await getHeaderData(url);
    thisRecord.lastModified = headerData.lastModified;
    thisRecord.contentLength = headerData.contentLength;
    thisRecord.stableLocation = "true";
  } catch(err) {
    if (!err.status) throw err;
    console.error(err)
    metadata.push({
      ...thisRecord,
      stableLocation: "false",
    })
    return;
  }
  const header = await readHeader(url);
  thisRecord.headerFields = header.join('|');
  if (metadata.comparePrevious(thisRecord)) {
    console.log(`The ${datasetName} dataset schema is stable.`);
    thisRecord.stableColumns = "true";
  } else {
    console.warn(`The ${datasetName} dataset schema has changed!`);
    thisRecord.stableColumns = "false";
  };
  metadata.push(thisRecord);
  const data = await loadData(url, header);

  await writeCsv(transformer(data)
    .map(mapper), dataPath(output));
  await buildReport();
  return;
}

async function main() {
  metadata.readMetadata();
  await Promise.all(sources.map(process));
  metadata.writeMetadata();
}

main();
