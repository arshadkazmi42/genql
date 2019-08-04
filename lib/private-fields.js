/**
 * Returns list of columns from input model which has `private` flags attached to it
 * If a prefix input is given it appends that prefix with the column name for the query
 * @param model : JSON
 * @param prefix : String
 */
const get = (model, prefix) => {
  if (!model) {
    throw new Error('Model is required');
  }

  let fields = [];
  prefix = prefix ? `${prefix}.` : '';
  for (let column of model.columns) {
    if (column.private) {
      fields.push(`${prefix}${column.name}`);
    }
  }

  return fields;
};


module.exports = {
  get
};
