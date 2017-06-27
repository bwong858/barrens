const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client/dist'));


// app.get('/areas/barrens', (req, res) => {
//   items.selectAll((err, data) => {
//     err ? res.sendStatus(500) : res.json(data);
//   });
// });

app.get('/', (req, res) => {
  res.send('get request to home page');
});

app.get('/channels/barrens', (req, res) => {
  items.selectAll((err, data) => {
    err ? res.sendStatus(500) : res.json(data);
  });
});




app.listen(3000, () => {
  console.log('listening on port 3000!');
});
