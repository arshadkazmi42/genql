const _ = require('lodash');


const get = (model, field) => {
  if (!model || !field) {
    throw new Error('Model and field are required');
  }

  if (!model.columns) {
    throw new Error('Invalid model structure');
  }

  return _.find(model.columns, { name: field });
};


module.exports = {
  get
};
