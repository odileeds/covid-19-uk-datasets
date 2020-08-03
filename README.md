# ODI Leeds COVID-19 UK Dataset aggregator

![](./badges/England-cases.svg)

We have created this repository to bring together (and track) the status of important COVID-19
datasets for the four nations of the UK. It is happening now as we have previously relied on
the [exceptional job done by Tom White](https://github.com/tomwhite/covid-19-uk-data). We have
come to rely on this, and
[some of our visuations](https://odileeds.github.io/covid-19/LocalAuthorities/hexmap.html) and the
[Local Authority dashboard](https://odileeds.github.io/covid-19/LocalAuthorities/) will no longer
be updated, unless we can collate the details ourselves.

## Datasets

* [English Cases by ONS Code (UTLA and English Region)](./data/england-cases.csv)

## Notes

Case data:

### England

* England data is easy to work with.
* Link from dashboard - this may go away.
* Column headers have spaces, so less easy to work with as properties.

### Scotland

* CSV is in a github repo, so more easily referenceable.
* ...but the per-NHS Board data is in a wide table (row per date, column per board) => Not as easy to machine process.
