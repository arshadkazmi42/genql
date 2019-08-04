const { expect } = require('chai');
const { 
  DefaultValue,
  InsertFields,
  JoinFields,
  PrivateFields,
  QueryValues,
  SelectFields,
  UpdateValues
} = require('../index');

const FIELDS = ['name', 'class', 'status'];
const MODEL = require('../data/model.json');
const DATA = {
  'name': {
    json: 'Arshad'
  },
  'email': 'arshadkazmi42@gmail.com',
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
  '{"json":"Arshad"}',
  'none',
  'active'
];


describe('test all functionalities on the model', () => {
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
  it('should return all insert fields', () => {
    try  {
      InsertFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = InsertFields.get(MODEL, 'prefix');
    expect(fields).to.deep.equal(INSERT_FIELDS);
  });
  it('should return all join fields', () => {
    try  {
      JoinFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = JoinFields.get(MODEL);
    expect(fields).to.deep.equal(JOIN_FIELDS);
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
  it('should return the query field values', () => {
    try  {
      QueryValues.get();
    } catch (err) {
      expect(err.message).to.equal('Model and data are required');
    }

    const values = QueryValues.get(MODEL, DATA);
    expect(values).to.deep.equal(QUERY_VALUES);
  });
  it('should return all select columns from model', () => {
    try  {
      SelectFields.get();
    } catch (err) {
      expect(err.message).to.equal('Model is required');
    }

    const fields = SelectFields.get(MODEL);
    expect(fields).to.deep.equal(SELECT_FIELDS);
  });
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
