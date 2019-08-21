const _ = require('lodash');


function GenQL(model) {

  if (!model) {
    throw new Error('Model is required');
  }

  if (!model.columns) {
    throw new Error('Invalid model structure');
  }

  this.model = model;
}


GenQL.prototype._default = function(field) {
  if (!field) {
    throw new Error('Field is required');
  }
  
  const column = this._find(field);
  if (!column) {
    return;
  }

  return column.defaultValue;
};


GenQL.prototype._find = function(field) {
  if (!field) {
    throw new Error('Field is required');
  }

  return _.find(this.model.columns, { name: field });
};


GenQL.prototype._insert = function(prefix) {

  prefix = prefix ? `${prefix}.` : '';
  
  const columns = _.filter(this.model.columns, (column) => !column.auto);
  return _.map(columns, column => {
    return `${prefix}${column.name}`;
  });
};


GenQL.prototype._join = function(prefix) {

  prefix = prefix ? `${prefix}.` : '';
  const { join_key, columns } = this.model;
  
  return _.map(columns, (column) => {
    if (column.alternate) {
      return `COALESCE(NULLIF(${prefix}${column.name}, ''), ${column.alternate}) as ${join_key}_${column.name}`;
    }

    return `${prefix}${column.name} as ${join_key}_${column.name}`;
  });
};


GenQL.prototype._pointer = function(length) {
  if (!length) {
    throw new Error('Length is required');
  }

  return _.times(length, _.constant('?'));
};


GenQL.prototype._findPrivate = function(prefix) {

  prefix = prefix ? `${prefix}.` : '';
  
  const columns = _.filter(this.model.columns, column => column.private);
  return _.map(columns, (column) => {
    return `${prefix}${column.name}`;
  });
};


GenQL.prototype._removePrivate = function(data) {

  return _.omit(data, this._findPrivate());
};


GenQL.prototype._values = function(data) {

  const columns = _.filter(this.model.columns, column => !column.auto);
  return _.map(columns, column => {
    return _.get(data, column.name) || column.defaultValue;
  });
};


GenQL.prototype._select = function(prefix) {
  prefix = prefix ? `${prefix}.` : '';

  return _.map(this.model.columns, column => {
    if (column.alternate) {
      return `COALESCE(NULLIF(${prefix}${column.name}, ''), ${column.alternate})`;
    }

    return `${prefix}${column.name}`;
  });
};


GenQL.prototype._update = function(fields, data) {
  return _.map(fields, field => {
    return _.get(data, field) || this._default(field);
  });
};


module.exports = GenQL;
