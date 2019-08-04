/**
 * Returns fields from the input models
 * Uses join_key from model as prefix for column names
 * @param model : JSON
 * @param prefix : String
 */
const get = (model, prefix) => {
  let fields = [];
  prefix = prefix ? `${prefix}.` : '';
  for (let column of model.columns) {
    if (column.alternate) {
      fields.push(`COALESCE(NULLIF(${prefix}${column.name},''), ${column.alternate}) as ${model.join_key}_${column.name}`);
    } else {
      fields.push(`${prefix}${column.name} as ${model.join_key}_${column.name}`);
    }
  }

  return fields;
};


module.exports = {
  get
};