const { getModificationTime, identity, writeCsv, dataPath } = require("./util");
const mappers = require('./mappers');

const { readHeader } = require("./readHeader");
const { loadData } = require("./loadData");
const { metadata } = require("./metadata");

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
    output: 'scotland-cases.csv'
  }
];

async function process({ geo, measure, url, mapper = identity, output}) {
  const dateFetched = (new Date).toISOString();
  const datasetName = `${geo}-${measure}`;
  const thisRecord = {
    datasetName,
    dateFetched,
  }
  try {
    thisRecord.lastModified = await getModificationTime(url);
    thisRecord.stableLocation = "true";
  } catch(err) {
    if (err.status !== 404) throw err;
    metadata.push({
      ...thisRecord,
      stableLocation: "false",
    })
    return;
  }
  const header = await readHeader(url);
  thisRecord.headerFields = header.join('|');
  if (metadata.comparePrevious(thisRecord)) {
    console.log(`The ${datasetName} dataset is stable.`);
    thisRecord.stableColumns = "true";
  } else {
    console.warning(`The ${datasetName} dataset has changed!`)
    thisRecord.stableColumns = "false";
  };
  metadata.push(thisRecord);
  const data = await loadData(url, header);

  await writeCsv(data.map(mapper), dataPath(output));
  return;
}

async function main() {
  metadata.readMetadata();
  await Promise.all(sources.map(process));
  metadata.writeMetadata();
}

main();
