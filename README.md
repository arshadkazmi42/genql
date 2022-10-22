# genql

[![Build](https://github.com/arshadkazmi42/genql/actions/workflows/nodejs.yml/badge.svg)](https://github.com/arshadkazmi42/genql/actions/workflows/nodejs.yml)
[![NPM Version](https://img.shields.io/npm/v/genql.svg)](https://www.npmjs.com/package/genql)
[![NPM Downloads](https://img.shields.io/npm/dt/genql.svg)](https://www.npmjs.com/package/genql)
[![Github Repo Size](https://img.shields.io/github/repo-size/arshadkazmi42/genql.svg)](https://github.com/arshadkazmi42/genql)
[![LICENSE](https://img.shields.io/npm/l/genql.svg)](https://github.com/arshadkazmi42/genql/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/arshadkazmi42/genql.svg)](https://github.com/arshadkazmi42/genql/graphs/contributors)
[![Commit](https://img.shields.io/github/last-commit/arshadkazmi42/genql.svg)](https://github.com/arshadkazmi42/genql/commits/master)



Helper for SQL query generating and formatting

## Install

```
npm i genql
```

## Usage

```javascript

const GenQL = require('genql');
const model = require('./data/model.json');

const $ = new GenQL(model);
const fields = $._select();
const fieldPrefix = $._select('$');
console.log(fields);
console.log(fieldPrefix);

// OUTPUT -> {{fields}}
// [
//  'id',
//  'name',
//  'email',
//  'COALESCE(NULLIF(class, ''), cls)',
//  'status'
// ]

// OUTPUT -> {{fieldPrefix}}
// [
//  '$.id',
//  '$.name',
//  '$.email',
//  'COALESCE(NULLIF($.class, ''), cls)',
//  '$.status'
// ]

```

## API

- **`_default(field)`**
  - Returns default value for the field from model
  - ***`Params`***
    - field (string)

- **`_insert(prefix)`**
  - Returns all the fields from model, except the `auto` fields. Uses optional `prefix` and appends it to column name
  - ***`Params`***
    - prefix (String) {Optional}

- **`_join(prefix)`**
  - Returns all the fields from model, appended with `join_key` as prefix which is defined in model. Uses optional `prefix`  and appends it to column name
  - ***`Params`***
    - prefix (String) {Optional}

- **`_findPrivate(prefix)`**
  - Returns all the column which have `private` flag defined with it in the model. Uses optinal `prefix` and appends it to column names
  - ***`Params`***
    - prefix (String) {Optional}

- **`_removePrivate(data)`**
  - Removes all the values from `data` object which are marked as private column in model
  - ***`Params`***
    - data {JSON}

- **`_values(data)`**
  - Returns list of values from data object for all the columns from model which are not marked as private
  - ***`Params`***
    - data (JSON)

- **`_select(prefix)`**
  - Returns all the fields from model and uses alternate column if defined in model. Uses optional `prefix` and appends it to column name
  - ***`Params`***
    - prefix (String) {Optional}

- **`_update(fields, data)`**
  - Returns list of values from data for the input fields
  - ***`Params`***
    - fields (Array)
    - data (JSON)

> Note: Sample model definition is available in [data/model.json](data/model.json)


## Contributing

Interested in contributing to this project?
You can log any issues or suggestion related to this library [here](https://github.com/arshadkazmi42/genql/issues/new)

Read our contributing [guide](CONTRIBUTING.md) on getting started with contributing to the codebase

