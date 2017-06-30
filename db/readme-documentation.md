# Barrens DB Documentation

> Location-based chat app with epic point system

## Victorious Vipers

  - Mason Raasch (@man-of-seafood)
  - Arthur Liou (@artliou)
  - Brian Wong (@bwong858)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Notes
Barren's Database Table Schema
Currently 6 Schemas

Documentation & Resources:

https://www.postgresql.org/docs/current/static/index.html

http://postgresguide.com/sql/select.html

http://postgresguide.com/

> PSQL Useful Commands

Enter PSQL Prompt

psql

IMPORTANT: To Run the DB in PSQL

psql -f db.sql

List all DBs

\l

View all Tables

\d

Exit out of PSQL

Control + D, or
\q

> Useful PSQL SQL Queries

Query
"SELECT username, points FROM users;"

Filtering Data
"SELECT content, upvotes
FROM messages
WHERE lat >= '2012-01-01'
  AND long < '2012-02-01'
 ;"

## Geo-Location Notes
> SQL Commands

Finding All users in an area

"SELECT areas.name FROM areas, messages WHERE ST_Contains(areas.geom, messages.geom);"

Creating Areas:

"INSERT into areas VALUES (string, create polygon with location);"

"INSERT into areas VALUES ('SF', ST_Polygon(ST_GeomFromText('LINESTRING(75.15 29.53,77 29,77.6 29.5, 75.15 29.53)'), 4326);"

Sample Code/Template
"GeomFromText('POLYGON((long1 lat1, long2 lat2, long3 lat3))');"

Creating Long & Lat Points for Messages (x, y)

"INSERT into messages VALUES (etc, etc, etc, ST_SetSRID(ST_MakePoint(longitude, latitude),4326); );"

> ST_Contains — Returns true if and only if no points of B lie in the exterior of A, and at least one point of the interior of B lies in the interior of A.
IE: if B is completely in A

Sample Command: "SELECT ST_Contains("POLYGON", ST_SetSRID(ST_MakePoint(-71.0, 42.3),4326)) FROM areas"

> PostGIS Resources:

http://postgis.net/

https://postgis.net/docs/ST_MakePoint.html

https://postgis.net/docs/ST_Contains.html

https://postgis.net/docs/ST_MakePoint.html

## Requirements

- Postgresql 9.1.x
- PostGIS

## Development

### Installing Dependencies

From within the root directory:

npm install pg

brew install postgis