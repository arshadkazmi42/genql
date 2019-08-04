/**
 * Returns column default value
 * If there is no default value it returns null
 * @param model : JSON
 * @param field : String (column name from model)
 */
const get = (model, field) => {
  if (!model || !field) {
    throw new Error('Model and field name are required');
  }
  
  for (let column of model.columns) {
    if (column.name === field) {
      return column.defaultValue;
    }
  }

  return null;
};


module.exports = {
  get
};
