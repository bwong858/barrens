/***
Sample for how a database would be created via running query scripts.
Port: 5432
***/

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
//var conString = "pg://admin:guest@localhost:5432/Employees";

/***
Here we create a new instance of Client to interact with the database and then establish communication with it via the connect() method. We then run a SQL query via the query() method. Finally, communication is closed via the end() method.
***/

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });


/***
For creating tables that don't exist yet
client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");

Geo-location
// insert into geo_table values (1, '((2,2),(3,4),(3,6),(1,1))');
// GeomFromText('POLYGON((long1 lat1, long2 lat2, long3 lat3))')

***/