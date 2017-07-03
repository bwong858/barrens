const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db');

const { dummyChannels, dummyUsers, dummyMessages } = require('./dummyData');

const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log('listening on port 8000!');
});

const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  res.send('server is responding to different paths');
});

app.get('/api/messages/:lat/:long', (req, res) => {
  // figure out which region we're looking in
  //retrieve all messages that have been tagged with that region
  //retrieve all messages tagged with general'
  console.log(`receiving the initial GET request with coords ${req.params.lat}, ${req.params.long}`);
  //retrieve all messages tagged with the region corresponding to incoming coords
  db.query('SELECT * from areas;', null, (err, results) => {
    if (err) {  
      console.log('err querying pg db:', err);
      res.sendStatus(500);
    }
    //console.log('successfully got noe mission', results.rows[0].geom);
    const MissionNoeRegion = `ST_Polygon(ST_GeomFromText('LINESTRING(37.7453366 -122.4379927, 37.7481003 -122.415084, 37.76088 -122.4127313, 37.7607018 -122.4360408, 37.7453366 -122.4379927)'), 4326)`;

    const aPointInMissionNoe = 'ST_SetSRID(ST_MakePoint(37.7531416, -122.4260732),4326)';
    db.query(`SELECT ST_Contains(${MissionNoeRegion}, ${aPointInMissionNoe});`, null, (err, resultsSTContains) => {
      if (err) {
        console.log('err executing ST_Contains:', err);
        res.sendStatus(500);
      }
      console.log('results of ST_Contains:', resultsSTContains);
      res.sendStatus(200);
    });    
  });
  res.json(dummyMessages);
});

app.get('/api/:lat/:long/:channel', (req, res) => {
  //
});

app.get('/api/region/:lat/:long', (req, res) => {
  //retrieve region name based off lat and long
});

app.post('/api/users/:newUsername', (req, res) => {
  const newUsername = req.params.newUsername;
  db.query('SELECT username from users;', null, (err, results) => {
    if (err) {
      console.log('err retrieving messages from the db', err);
      res.status(500).send('Error retrieving messages');
    }
    const usernames = results.rows.map(rowObj => rowObj.username);
    if (usernames.includes(newUsername)) {
      res.status(406).send('username already taken');
    } else {
      db.query(`INSERT INTO users VALUES (DEFAULT, '${newUsername}', 0, null);`, null, (err, resultsOfInsertion) => {
        if (err) {
          console.log('err inserting into db', err);
          res.status(500).send('Error inserting into db');
        }
        console.log('successfully inserted into users', resultsOfInsertion);
        res.status(201).send('successfully inserted into users');
      });
    }
  });
});


app.put('/api/users/:username/:lat/:long', (req, res) => {
  //update the user with name=username with the coords denoting their location
  //update is likely not the same command as insert into
  //if update is complicated, have it all come in as a single request 
  //return a response that contains the type string region name 
  res.status(201).send('Hack reactor');
});
// likely no posting messages route -- everything will happen in the socket

io.sockets.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('subscribe', (room) => {
    console.log('joining room', room);
    socket.join(room);
  });
  socket.on('unsubscribe', (room) => {
    console.log('leaving room', room);
    socket.leave(room);
  });
  socket.on('send', (data) => {
    console.log('received message', data);
    io.sockets.in(data.region).emit('message', data);
    db.query(`INSERT INTO messages VALUES (DEFAULT, null, '${data.text}', null, 0, 0, '${data.region}', null, null);`, null, (err, results) => {
      if (err) {
        console.log('err inserting into messages', err);
      } else {
        console.log('success inserting into messages');
      }
    });
    // io.emit('message', data);
  });
});