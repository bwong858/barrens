/***
Barren's Database Table Schema
6 Schemas
Another Schema is to be build, but is a lower priority

Dependencies: npm install pg

Documentation & Resources:
https://www.postgresql.org/docs/current/static/index.html
http://postgresguide.com/sql/select.html
http://postgresguide.com/

*****PSQL Useful Commands

Enter PSQL Prompt
psql

RUN THIS FILE in psql
psql -f db.sql

List all DBs
\l

View all Tables
\d
\dt?

Exit out of PSQL
Control + D, or
\q

*****PSQL Useful SQL Queries
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

Finding All users in an area
"SELECT areas.name
FROM areas, messages
WHERE ST_Contains(areas.geom, messages.geom);"

Resources:
http://postgis.net/

https://postgis.net/docs/ST_MakePoint.html

Creating Areas:
INSERT into areas VALUES (string, create polygon with location);

INSERT into areas VALUES ('SF', ST_Polygon(ST_GeomFromText('LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)'), 4326);

Sample Code/Template
GeomFromText('POLYGON((long1 lat1, long2 lat2, long3 lat3))')

MakePoint
https://postgis.net/docs/ST_MakePoint.html

Creating Points (for Messages)
INSERT into messages VALUES (etc, etc, etc, 

ST_SetSRID(ST_MakePoint(longitude, latitude),4326);

);

Contains
https://postgis.net/docs/ST_Contains.html
ST_Contains — Returns true if and only if no points of B lie in the exterior of A, and at least one point of the interior of B lies in the interior of A.
IE: if B is completely in A

Command
SELECT ST_Contains("POLYGON",
  ST_SetSRID(ST_MakePoint(-71.0, 42.3),4326))
FROM areas

***/

DROP DATABASE IF EXISTS barrens;
CREATE DATABASE barrens;

-- Command to Connect to DB
\c barrens;

-- Enable PostGIS (includes raster); Required for geo-location
CREATE EXTENSION postgis;

CREATE TABLE areas (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  geom POLYGON
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  points INTEGER,
  session BOOLEAN NOT NULL,
  hash VARCHAR NOT NULL,
  salt VARCHAR UNIQUE
);
-- chkpass is alternative data type, needs ckpass module installed

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  area VARCHAR REFERENCES areas (name),
  description VARCHAR,
  url VARCHAR
);

CREATE TABLE channels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  users VARCHAR REFERENCES users (username),
  areas VARCHAR REFERENCES areas (name)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  username VARCHAR REFERENCES users (username),
  content TEXT NOT NULL,
  channels VARCHAR REFERENCES channels (name),
  upvotes SMALLINT,
  downvotes SMALLINT,
  area VARCHAR REFERENCES areas (name),
  stamp TIMESTAMPTZ NOT NULL,
  location POINT NOT NULL
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
