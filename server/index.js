const express = require('express');
const bodyParser = require('body-parser');
// const dummyMessages = [
//   {
//     id: 0,
//     username: 'hank',
//     userId: 2,
//     text: 'Sups',
//     roomAndRegion: 'SF-General'
//   },
//   {
//     id: 1,
//     username: 'bobby',
//     userId: 3,
//     text: 'Nups',
//     roomAndRegion: 'SF-General'
//   },
//   {
//     id: 2,
//     username: 'boomhauer',
//     userId: 10,
//     text: 'Pups',
//     roomAndRegion: 'SF-General'
//   }
// ];

// const db = require('../database');

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
  // figure out which region we're loo  king in
  //retrieve all messages that have been tagged with that region
  //retrieve all messages tagged with general'
  console.log('receiving the initial GET request');
  //retrieve all messages tagged with general
  res.json(dummyMessages);
});

app.get('/api/:lat/:long/:channel', (req, res) => {
  //every message will have coords and so we'll check each time
  //actually this should be don
});


app.get('/api/:region/:channel', (req, res) => {
  //retrieve all messages that have been tagged with that region and channel
});

app.get('/api/region/:lat/:long', (req, res) => {
  //retrieve region name based off lat and long
});

app.get('/hi', (req, res) => {
  res.send('hi');
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
    // io.emit('message', data);
  });
});
