const { expect } = require('chai');
const _ = require('lodash');

const { 
  DefaultValue,
  InsertFields,
  JoinFields,
  PrivateFields,
  Parser,
  QueryValues,
  SelectFields,
  UpdateValues,
  ValuesPointer
} = require('../index');

const BLOB_DATA = '{"type":"Buffer","data":[118,49,48,215,237,167,249,243,19,0,154,172,45,177,18,115,66,18,133,179,117,163,148,13,106,231,219,121,53,252,127,128,5,50,52,161,101,76,166,202,30,253,119,76,22,61,251,177,167,134,247,60,43,193,42,129,125,11,161,21,164,70,169,83,153,213,84,90,234,33,155,190,35,132,106,194,85,196,50,107,105,9,69,44,21,81,101,39,7,192,226,244,206,44,135,11,108,137,190,249,20,133,81,242,184,81,105,249,46,153,103,235,63,53,237,104,61,19,101,36,15,185,191,124,48,176,112,220,218,180,41,144,163,227,127,157,93,124,228,63,246,58,111,171,57,64,245]}';
const FIELDS = ['name', 'class', 'status'];
const MODEL = require('../data/model.json');
const DATA = {
  'name': {
    json: 'Arshad'
  },
  'email': 'arshadkazmi42@gmail.com',
  'class': 'none'
};

const DATA_NO_PRIVATE = {
  'name': {
    json: 'Arshad'
  },
  'class': 'none'
};

const SELECT_FIELDS = [
  'id',
  'name',
  'email',
  'class',
  'status'
];

const INSERT_FIELDS = [
  'prefix.name',
  'prefix.email',
  'prefix.class',
  'prefix.status'
];

const JOIN_FIELDS = [
  'id as students_id',
  'name as students_name',
  'email as students_email',
  'class as students_class',
  'status as students_status'
];

const QUERY_VALUES = [
  {
    json: 'Arshad'
  },
  'arshadkazmi42@gmail.com',
  'none',
  'active'
];

const UPDATE_VALUES = [
  {
    json: 'Arshad'
  },
  'none',
  'active'
];


describe('test private-fields functions', () => {
  it('should remove private fields from data', () => {
    try  {
      PrivateFields.remove();
    } catch (err) {
      expect(err.message).to.equal('Model and data are required');
    }

    const fields = PrivateFields.remove(MODEL, _.cloneDeep(DATA));
    expect(fields).to.deep.equal(DATA_NO_PRIVATE);
  });
  it('should return the private fields', () => {
    try  {
      PrivateFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = PrivateFields.get(MODEL);
    expect(fields).to.deep.equal(['email']);
  });
});

describe('Util functionality', () => {
  it('should return list of pointers', () => {
    try {
      ValuesPointer.get();
    } catch (err) {
      expect(err.message).to.equal('Length is required');
    }

    const pointers = ValuesPointer.get(5);
    expect(pointers.length).to.equal(5);
    expect(pointers).to.deep.equal(['?', '?', '?', '?', '?']);
  });
});

describe('test default values functionality', () => {
  it('should return default value if available', () => {
    try  {
      DefaultValue.get();
    } catch (err) {
      expect(err.message).to.equal('Model and field name are required');
    }

    let defaultValue = DefaultValue.get(MODEL, 'status');
    expect(defaultValue).to.equal('active');

    defaultValue = DefaultValue.get(MODEL, 'name');
    expect(defaultValue).to.equal(undefined);
  });
});

describe('test insert fields functionalities', () => {
  it('should return all insert fields', () => {
    try  {
      InsertFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = InsertFields.get(MODEL, 'prefix');
    expect(fields).to.deep.equal(INSERT_FIELDS);
  });
});

describe('test join fields functionalities', () => {
  it('should return all join fields', () => {
    try  {
      JoinFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = JoinFields.get(MODEL);
    expect(fields).to.deep.equal(JOIN_FIELDS);
  });
});

describe('test query fields functionalities', () => {
  it('should return the query field values', () => {
    try  {
      QueryValues.get();
    } catch (err) {
      expect(err.message).to.equal('Model and data are required');
    }

    const values = QueryValues.get(MODEL, DATA);
    expect(values).to.deep.equal(QUERY_VALUES);
  });
});

describe('test select fields functionalities', () => {
  it('should return all select columns from model', () => {
    try  {
      SelectFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = SelectFields.get(MODEL);
    expect(fields).to.deep.equal(SELECT_FIELDS);
  });
});

describe('test all update values', () => {
  it('should return all update values', () => {
    try  {
      UpdateValues.get();
    } catch (err) {
      expect(err.message).to.equal('Model, fields and data are required');
    }

    const values = UpdateValues.get(MODEL, FIELDS, DATA);
    expect(values).to.deep.equal(UPDATE_VALUES);
  });
});

describe('test parser', () => {
  it('should return parsed buffer value', () => {
    const blob = Parser.get('blob', BLOB_DATA);
    expect(blob).to.deep.equal(Buffer.from(JSON.parse(BLOB_DATA), 'utf8'));
  });
  it('should return parsed json value', () => {
    const blob = Parser.get('json', BLOB_DATA);
    expect(blob).to.deep.equal(JSON.parse(BLOB_DATA), 'utf8');
  });
});
