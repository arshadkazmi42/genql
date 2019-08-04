# Model

The sample model is defined at [model.json](model.json). Definition is given below

At top level of model keys which can be used are as follows

- **name**: Table name for which model is created
- **foreign_key**: Foreign key which can be used in join queries (preferred key is `table_name_primary_column_name`)
- **join_key**: Key which will be used as prefix with columns on using this table as join with other tables (preferred key is `table_name`)
- **columns**: This will hold list of all the columns with its definition

#### Column Definitions

- **name**: Name of the column
- **auto**: This is a flag, if the value for this column is generated automatically keep it as true (default value is false)
- **defaultValue**: Default value for the column, this will be used if data is for the column is not available
- **alternate**: Alternate column where this value can be picked up from, this is mostly used during join queries (preferred key is `table_name.column_name`)
- **private**: Private flag (true/false), this is used to make a private column and these values will never be returned as response