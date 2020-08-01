function en2020731(data) {
  const {
    'Area code': AreaCode,
    'Area name': AreaName,
    'Specimen date': Date,
    'Daily lab-confirmed cases': DailyCases,
    'Cumulative lab-confirmed cases': TotalCases,
  } = data;

  return {
    AreaCode,
    // AreaName,
    Date,
    DailyCases,
    TotalCases,
  }
}

module.exports = {
  en: en2020731,
}