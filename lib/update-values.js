const _ = require('lodash');
const isObject = require('is-obj');

const DefaulValue = require('./default-value');


/**
 * Returns array of values for UPDATE query.
 * This parses values from data json based on the input fields array
 * If any value is missing for a column in data object it will use the default values
 * @param model : JSON
 * @param fields : Array of string (column names)
 * @param data : JSON (Key as column name and value as value for the column)
 */
const get = (model, fields, data) => {
  if (!model || !fields || !data) {
    throw new Error('Model, fields and data are required');
  }

  const values = [];
  for (let field of fields) {
    let fieldData = _.get(data, field);
    if (fieldData) {
      if (isObject(fieldData)) {
        values.push(JSON.stringify(fieldData));
      } else {
        values.push(fieldData);
      }
    } else {
      fieldData = DefaulValue.get(model, field);
      values.push(fieldData);
    }
  }

  return values;
};


module.exports = {
  get
};
