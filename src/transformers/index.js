const scotlandAreadLookup = [
  { AreaCode: 'S08000015', names: ['Ayrshire and Arran'] },
  { AreaCode: 'S08000016', names: ['Borders'] },
  { AreaCode: 'S08000017', names: ['Dumfries and Galloway'] },
  { AreaCode: 'S08000029', names: ['Fife'] },
  { AreaCode: 'S08000019', names: ['Forth Valley'] },
  { AreaCode: 'S08000020', names: ['Grampian'] },
  { AreaCode: 'S08000031', names: ['Greater Glasgow and Clyde'] },
  { AreaCode: 'S08000022', names: ['Highland'] },
  { AreaCode: 'S08000032', names: ['Lanarkshire'] },
  { AreaCode: 'S08000024', names: ['Lothian'] },
  { AreaCode: 'S08000025', names: ['Orkney'] },
  { AreaCode: 'S08000026', names: ['Shetland'] },
  { AreaCode: 'S08000030', names: ['Tayside'] },
  { AreaCode: 'S08000028', names: ['Western Isles'] },
];

function scotlandTransform(data) {
  return data.reduce((acc, row) => {
      const { Date, ...values } = row
      Object.entries(values)
        .forEach(([AreaName, TotalCases]) => {
          if (TotalCases === '*') return;
          const { AreaCode } = scotlandAreadLookup.find(e => e.names.includes(AreaName));
          acc.push({ AreaCode, AreaName, Date, TotalCases });
        });
      return acc;
    },
    []
  )
  .sort((a, b) => {
    if (a.Date > b.Date) return -1;
    if (a.Date < b.Date) return 1;
    return 0;
  });
}

module.exports = {
  scotlandTransform,
};
