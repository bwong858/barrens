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
  const userLat = req.params.lat;
  const userLong = req.params.long;
  
  const userCoord = `ST_SetSRID(ST_MakePoint(${userLat}, ${userLong}),4326)`;
  db.query(`SELECT id, name FROM areas WHERE ST_Contains(geom, ${userCoord});`, null, (err, result) => {
    if (err) {
      console.log('err executing ST_Contains:', err);
      res.sendStatus(500);
    } else {
      const userRegionID = result.rows[0].id;
      const userRegionName = result.rows[0].name;
      console.log('id and name of region user was placed in:', result.rows[0].name);
      //at this point we have the id and name
      //update the users table with the id of the region that user is in
      //send the name of the region the user was placed in
      db.query(`UPDATE users SET areas=${userRegionID}`, null, (err, result) => {
        if (err) {
          console.log('err updating the user record', err);
          res.sendStatus(500);
        } else {
          console.log('successfully updated user');
          res.status(201).send(`${userRegionName}`);
        }
      }); 
    }
  });    
  
  //res.status(201).send('Hack reactor');
});
// likely no posting messages route -- everything will happen in the socket

// ---------------------------- SOCKET LOGIC ------------------------------

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
    //need to get the id corresponding to a user, the id corresponding to the channel name, and the id corresponding to the area
    db.query(`INSERT INTO messages VALUES (DEFAULT, 1, '${data.text}', 1, 0, 0, 1, null, null);`, null, (err, results) => {
      if (err) {
        console.log('err inserting into messages', err);
      } else {
        console.log('success inserting into messages');
      }
    });
    // io.emit('message', data);
  });
});