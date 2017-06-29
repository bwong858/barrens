DROP DATABASE IF EXISTS barrens;
CREATE DATABASE barrens;

\c barrens;

CREATE TABLE areas (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  lat INTEGER,
  long INTEGER
);

CREATE TABLE channels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  users VARCHAR REFERENCES users (name),
  areas VARCHAR REFERENCES areas (name)
);

CREATE TABLE messages )
  ID SERIAL PRIMARY KEY,
  user VARCHAR REFERENCES users (id),
  content TEXT,
  channel VARCHAR REFERENCES name (name),
  upvotes SMALLINT,
  downvotes SMALLINT,
  lat INTEGER,
  long INTEGER,
  area VARCHAR REFERENCES areas (name)
  stamp TIMESTAMPTZ
);

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  points INTEGER
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  area REFERENCES areas (name),
  description VARCHAR,
  link VARCHAR
);
-- TBD
CREATE TABLE users_events (
  ID SERIAL PRIMARY KEY,
  users
  events
);

CREATE TABLE cookies (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  area VARCHAR,
  stamp TIMESTAMPTZ
);
