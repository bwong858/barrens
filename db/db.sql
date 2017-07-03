-- Check ReadMe Documentation

DROP DATABASE IF EXISTS barrens;
CREATE DATABASE barrens;

-- Command to Connect to DB
\c barrens;

-- Enable PostGIS (includes raster); Required for geo-location
-- You should use GEOMETRY somewhere in the areas so you can use ST_Contains
CREATE EXTENSION postgis;

CREATE TABLE areas (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  minLong DOUBLE PRECISION,
  minLat DOUBLE PRECISION,
  maxLong DOUBLE PRECISION,
  maxLat DOUBLE PRECISION,
  geom GEOMETRY
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  points INTEGER,
  salt VARCHAR UNIQUE
);
-- chkpass is alternative data type, needs ckpass module installed

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  area integer REFERENCES areas (id),
  description VARCHAR,
  url VARCHAR
);

CREATE TABLE channels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  users INTEGER REFERENCES users (id),
  areas INTEGER REFERENCES areas (id)
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  username INTEGER REFERENCES users (id),
  content TEXT NOT NULL,
  channels INTEGER REFERENCES channels (id),
  upvotes SMALLINT,
  downvotes SMALLINT,
  area INTEGER REFERENCES areas (id),
  stamp TIMESTAMPTZ,
  location POINT
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

-- Hard Coding Regions into the Areas Table

INSERT INTO areas VALUES (DEFAULT, 'MissionNoeRegion', -122.4127313, 37.7453366, -122.4379927, 37.76088, ST_Polygon(ST_GeomFromText('LINESTRING(37.7453366 -122.4379927, 37.7481003 -122.415084, 37.76088 -122.4127313, 37.7607018 -122.4360408, 37.7453366 -122.4379927)'), 4326));

INSERT INTO areas VALUES (DEFAULT, 'Hack Reactor', -122.4127313, 37.7453366, -122.4379927, 37.76088, ST_Polygon(ST_GeomFromText('LINESTRING(37.7839812 -122.4095393, 37.7840088 -122.4081901, 37.7832896 -122.4081727, 37.7830909 -122.4098289, 37.7839812 -122.4095393)'), 4326));

-- HR Lat & Long (37.7836076, -122.4090994); Below is Command for Hack Reactor
-- SELECT name FROM AREAS WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint(37.7836076, -122.4090994),4326));

INSERT INTO areas VALUES (DEFAULT, 'UC Berkeley', 0, 0, 0, 0, ST_Polygon(ST_GeomFromText('LINESTRING(37.8680837 -122.265975, 37.8739127 -122.2658892, 37.8751862 -122.2570486, 37.8718558 -122.2530789, 37.8696241 -122.2526511, 37.8680837 -122.265975)'), 4326));

-- HR Lat & Long (37.7836076, -122.4090994); Below is Command for Campanile
-- SELECT name FROM AREAS WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint(37.8723078, -122.2582824),4326));