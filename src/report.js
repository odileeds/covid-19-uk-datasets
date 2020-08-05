const path = require('path');
const { promises: { writeFile }} = require('fs');
const { metadata } = require('./metadataManager');

const statusColour = (status) => {
  return {
    stable: '#00BB00',
    unstable: '#EEBB00',
    broken: '#EE0000'
  }[status] || '#aaaaaa';
}

const statusIcon = (status) => {
  return {
    stable: 'transform="translate(5 4) scale(0.5) rotate(-45 12 12)" d="M 2 0 h 4 q 2 0 2 2 v 6 q 0 2 2 2 h 12 q 2 0 2 2 v 4 q 0 2 -2 2 H 2 q -2 0 -2 -2 V 2 Q 0 0 2 0"',
    unstable: 'transform="translate(8 4) scale(0.5)" d="M 2 0 h 4 q 2 0 2 2 l -1 12 q 0 2 -2 2 h -2 q -2 0 -2 -2 L 0 2 Q 0 0 2 0 M 4 18 q 4 0 4 4 q 0 4 -4 4 q -4 0 -4 -4 q 0 -4 4 -4"',
    broken: 'transform="translate(5 5) scale(0.5) rotate(-45 12 12) translate(0 6)" d="M 2 0 h 4 q 2 0 2 -2 v -4 q 0 -2 2 -2 h 4 q 2 0 2 2 v 4 q 0 2 2 2 h 4 q 2 0 2 2 v 4 q 0 2 -2 2 h -4 q -2 0 -2 2 v 4 q 0 2 -2 2 h -4 q -2 0 -2 -2 v -4 q 0 -2 -2 -2 h -4 q -2 0 -2 -2 v -4 q 0 -2 2 -2"',
  }[status];
}

const statusSvg = (dataset) => `<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 200 30" version="1.1">
  <rect fill="#444" width="200" height="30" rx="15"></rect>
  <text fill="white" font-family="Helvetica,Arial,sans-serif" dominant-baseline="middle" x="30" y="16">${dataset.datasetName}</text>
  <g transform="translate(5 5)">
    <rect width="20" height="20" x="0" y="0" fill="${statusColour(calculateStatus(dataset))}" rx="10"></rect>
    <path ${statusIcon(calculateStatus(dataset))} fill="white"/>
  </g>  
</svg>`

function calculateStatus({ stableLocation, stableColumns }) {
  if (stableLocation === 'false') return 'broken';
  if (stableColumns === 'false') return 'unstable';
  return 'stable';
}

const iconPath = (name) => path.resolve(path.join(__dirname, '..', 'badges', name));

async function buildReport() {
  if (!metadata.loaded) await metadata.readMetadata();
  metadata.latest.forEach(async dataset => {
    await writeFile(iconPath(`${dataset.datasetName}.svg`), statusSvg(dataset));
  })
}

module.exports = {
  buildReport,
};
