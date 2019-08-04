const _ = require('lodash');


const get = (length) => {
  if (!length) {
    throw new Error('Length is required');
  }

  return _.times(length, _.constant('?'));
};


module.exports = {
  get
};
