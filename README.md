# genql

[![Build Status](https://api.travis-ci.com/arshadkazmi42/genql.svg?branch=master)](https://api.travis-ci.com/arshadkazmi42/genql)

Helper for SQL query generating and formatting

## Install

```
npm i genql
```

## Usage

```javascript

const { SelectFields } = require('genql');
const model = require('./data/model.json');

const fields = SelectFields(model);
console.log(fields);

// OUTPUT
// [
//   'name',
//   'email',
//   'class',
//   'status'
// ]

```

## API

- #### `DefaultValue.get(model, field)`
  Takes model and field input, returns default value of the field if its available
  - **Params**
    - model (JSON)
    - field (string)

- #### `InsertFields.get(model, prefix={Optional})`
  Returns list of column names which can be used in insert query
  - **Params**
    - model (JSON)
    - prefix (String) {Optional}

- #### `JoinFields.get(model, prefix={Optional})`
  Returns list of fields from model which can be used in join queries
  - **Params**
    - model (JSON)
    - prefix (String) {Optional}

- #### `PrivateFields.get(model, prefix={Optional})`
  Returns list of all private fields from the model
  - **Params**
    - model (JSON)
    - prefix (String) {Optional}

- #### `QueryValues.get(model, data)`
  Returns list of values for the model columns, picks data from `data` for every column in model
  - **Param**
    - model (JSON)
    - data (JSON)

- #### `SelectFields.get(model, prefix={Optional})`
  Takes model input and returns list of select fields which can be used in select query
  - **Param**
    - model (JSON)
    - prefix (String) {Optional}

- #### `UpdateFields.get(model, fields, data)`
  Returns list of values from data for only the needed fields defined in fields list
  - **Param**
    - model (JSON)
    - fields (Array)
    - data (JSON)

#### Legends

- `model` (JSON): JSON model based on the table structure
- `prefix` (String)
- `field`: (String)
- `fields`: (Array) : List of fields
- `data`: (Object JSON)


## Contributing

Interested in contributing to this project?
You can log any issues or suggestion related to this library [here](https://github.com/arshadkazmi42/genql/issues/new)

Read our contributing [guide](CONTRIBUTING.md) on getting started with contributing to the codebase

## Contributors

Thank you to all the contributors who have helped us in making this project better :raised_hands:

<a href="https://github.com/arshadkazmi42"><img src="https://github.com/arshadkazmi42.png" width="30" /></a>


