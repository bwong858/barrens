/***
Barren's Database Table Schema
6 Schemas
Another Schema is to be build, but is a lower priority

Dependencies: npm install pg

Documentation & Resources:
http://postgresguide.com/sql/select.html
http://postgresguide.com/

Sample Commands/Queries:

View all Tables
/d

Query
"SELECT username, points FROM users;"

Filtering Data
"SELECT content, upvotes
FROM messages
WHERE lat >= '2012-01-01'
  AND long < '2012-02-01'
 ;"

******* Geo-Location
Installation: brew install postgis
OR using the POSTGRES.app

Geo-location Commands
"SELECT superhero.name
FROM city, superhero
WHERE ST_Contains(city.geom, superhero.geom)
AND city.name = 'Gotham';"

Resources:
http://postgis.net/
https://postgis.net/docs/ST_Contains.html
https://postgis.net/docs/ST_MakePoint.html
Geo-location

insert into geo_table values (1, '((2,2),(3,4),(3,6),(1,1))');
GeomFromText('POLYGON((long1 lat1, long2 lat2, long3 lat3))')

***/

DROP DATABASE IF EXISTS barrens;
CREATE DATABASE barrens;

-- Command to Connect to DB
\c barrens;

-- Enable PostGIS (includes raster)
CREATE EXTENSION postgis;

CREATE TABLE areas (
  ID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  long DOUBLE PRECISION NOT NULL
);
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  points INTEGER,
  session BOOLEAN NOT NULL,
  hash VARCHAR NOT NULL,
  salt VARCHAR UNIQUE
  -- chkpass is alternative data type, needs ckpass module installed
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  area REFERENCES areas (name),
  description VARCHAR,
  url VARCHAR
);

CREATE TABLE channels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  users VARCHAR REFERENCES users (name),
  areas VARCHAR REFERENCES areas (name)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  user VARCHAR REFERENCES users (id),
  content TEXT NOT NULL,
  channel VARCHAR REFERENCES name (name),
  upvotes SMALLINT,
  downvotes SMALLINT,
  lat DOUBLE PRECISION NOT NULL,
  long DOUBLE PRECISION NOT NULL,
  area VARCHAR REFERENCES areas (name),
  stamp TIMESTAMPTZ NOT NULL
);

-- Table Schema for Authentication
-- TimeStamp TZ - Data Type that includes time, date, time zone
CREATE TABLE session (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  area VARCHAR,
  stamp TIMESTAMPTZ
);

-- Attendees, Join would be many events to many users
-- CREATE TABLE users_events (
--   ID SERIAL PRIMARY KEY,
--   users
--   events
-- );
