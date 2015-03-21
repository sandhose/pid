var express = require('express');
var app = express();

/************************************************************
 *
 * Express routes for:
 *   - index.html
 *
 *   Sample endpoints to demo async data fetching:
 *     - POST /landing
 *     - POST /home
 *
 ************************************************************/

// Serve index page
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.post('/landing', function(req, res) {
  res.json({
    title: "Landing Page"
  });
});

app.post('/home', function(req, res) {
  res.json({
    title: "Home Page"
  });
});

app.post('/grid', function(req, res) {
  res.json([
    [1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
  ]);
});

app.post('/grid/random', function(req, res) {
  var size = 20, grid = [];
  for(var i = 0; i < size; i++) {
    grid[i] = [];
    for(var j = 0; j < size; j++) {
      grid[i][j] = Math.random() > 0.7 ? 1 : 0;
    }
  }
  res.json(grid);
});

/******************
 *
 * Express server
 *
 *****************/

var server = app.listen(process.env.SERVER_PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
