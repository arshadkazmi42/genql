const _ = require('lodash');

/**
 * Returns array of values which is used in insert queries based on the input model
 * It takes model and data json as input
 * values will be pulled from data json based on the model definition
 * It processes only non-auto fields
 * @param model : JSON
 * @param data : JSON (Key as column name and value as value for the column)
 */
const get = (model, data) => {
  const values = [];
  for (let column of model.columns) {
    if (!column.auto) {
      const value = _.get(data, column.name) || column.defaultValue;
      values.push(value);
    }
  }

  return values;
};


module.exports = {
  get
};
