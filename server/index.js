const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database');

const app = express();
const server = app.listen(9000, () => {
  console.log('listening on port 9000!');
});
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../client/dist'));

// app.get('/areas/barrens', (req, res) => {
//   items.selectAll((err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// });

app.get('/', (req, res) => {
  res.send('server is responding to different paths');
});

app.get('/api/:lat/:long/:channel', (req, res) => {
  // figure out which region we're looking in
  //retrieve all messages that have been tagged with that region
});

app.get('/api/:region/:channel', (req, res) => {
  //retrieve all messages that have been tagged with that region
});

app.get('/channels/barrens', (req, res) => {
  items.selectAll((err, data) => {
    err ? res.sendStatus(500) : res.json(data);
  });
});

io.on('connection', (socket) => {
  console.log('a user has connected');
});

// app.listen(9000, () => {
  
// });
