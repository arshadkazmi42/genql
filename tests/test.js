const { expect } = require('chai');

const GenQL = require('../index');

const MODEL = require('../data/model.json');
const $ = new GenQL(MODEL);

const FIELDS = ['name', 'email', 'class', 'status'];
const INSERT_FIELDS = ['$.name', '$.email', '$.class', '$.status'];
const POINTERS = ['?', '?', '?'];
const DATA_NO_AUTO = ['Arshad Kazmi', 'arshadkazmi42@gmail.com', '1st', 'active'];
const DATA = {
  id: '1',
  name: 'Arshad Kazmi',
  email: 'arshadkazmi42@gmail.com',
  class: '1st',
  status: 'active'
};

const DATA_NO_PRIVATE = {
  id: '1',
  name: 'Arshad Kazmi',
  class: '1st',
  status: 'active'
};

const DEFAULT_VALUE = {
  name: 'status',
  defaultValue: 'active'
};

const SELECT_FIELDS = [
  '$.id',
  '$.name',
  '$.email',
  'COALESCE(NULLIF($.class, \'\'), cls)',
  '$.status'
];

const SELECT_FIELDS_WITHOUT_PREFIX = [
  'id',
  'name',
  'email',
  'COALESCE(NULLIF(class, \'\'), cls)',
  'status'
];

const JOIN_SELECT_FIELDS = [
  '$.id as students_id',
  '$.name as students_name',
  '$.email as students_email',
  'COALESCE(NULLIF($.class, \'\'), cls) as students_class',
  '$.status as students_status'
];

const JOIN_SELECT_FIELDS_WO_PREFIX = [
  'id as students_id',
  'name as students_name',
  'email as students_email',
  'COALESCE(NULLIF(class, \'\'), cls) as students_class',
  'status as students_status'
];


describe('genql functionality validation', () => {
  it('should create genql object', () => {
    expect($.model).to.deep.equal(MODEL);
  });
  it('should return default value of the field', () => {
    expect($._default(DEFAULT_VALUE['name'])).to.equal(DEFAULT_VALUE['defaultValue']);
  });
  it('should return the column from model', () => {
    expect($._find(DEFAULT_VALUE['name'])).to.deep.equal(DEFAULT_VALUE);
  });
  it('should return list of insert columns with prefix', () => {
    expect($._insert('$')).to.deep.equal(INSERT_FIELDS);
  });
  it('should return list of insert columns without prefix', () => {
    expect($._insert()).to.deep.equal(FIELDS);
  });
  it('should return list of select fields with join with preifx', () => {
    expect($._join('$')).to.deep.equal(JOIN_SELECT_FIELDS);
  });
  it('should return list of select fields with join without prefix', () => {
    expect($._join()).to.deep.equal(JOIN_SELECT_FIELDS_WO_PREFIX);
  });
  it('should throw error invalid length', () => {
    try {
      $._pointer();
    } catch (err) {
      expect(err.message).to.equal('Length is required');
    }
  });
  it('should return pointers array', () => {
    expect($._pointer(3)).to.deep.equal(POINTERS);
  });
  it('should return private fields without preifx', () => {
    expect($._findPrivate()).to.deep.equal(['email']);
  });
  it('should return private fields with preifx', () => {
    expect($._findPrivate('$')).to.deep.equal(['$.email']);
  });
  it('should return data without private fields', () => {
    expect($._removePrivate(DATA)).to.deep.equal(DATA_NO_PRIVATE);
  });
  it('should return query fields', () => {
    expect($._values(DATA)).to.deep.equal(DATA_NO_AUTO);
  });
  it('should return select fields without prefix', () => {
    expect($._select()).to.deep.equal(SELECT_FIELDS_WITHOUT_PREFIX);
  });
  it('should return select fields with prefix', () => {
    expect($._select('$')).to.deep.equal(SELECT_FIELDS);
  });
  it('should return update field values', () => {
    expect($._update(FIELDS, DATA)).to.deep.equal(DATA_NO_AUTO);
  });
});
