/**
 * Returns column default value
 * If there is no default value it returns null
 * @param model : JSON
 * @param field : String (column name from model)
 */
const get = (model, field) => {
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
