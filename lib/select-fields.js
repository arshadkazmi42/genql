/**
 * Returns array of formatted fields from input model
 * @param model: JSON (Data Model)
 * @param prefix: String (To append to all column names)
 */
const get = (model, prefix) => {
  if (!model) {
    throw new Error('Model is required');
  }

  let fields = [];
  prefix = prefix ? `${prefix}.` : '';
  for (let column of model.columns) { 
    if (column.alternate) {
      fields.push(`COALESCE(NULLIF(${prefix}${column.name}, ''), ${column.alternate})`);
    } else {
      fields.push(`${prefix}${column.name}`);
    }
  }

  return fields;
};


module.exports = {
  get
};
