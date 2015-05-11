import Arduino from "./server/arduino";
import APIRouter from "./server/apiRouter";
import WebServer from "./server/webserver";

let motorsState = { speed: 0, direction: 0 };

let ino = new Arduino();
/*
PathfindingHandler.updateGrid([
  [1, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1]
]);
*/


/*app.post('/landing', function(req, res) {
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
  let size = 20, grid = [];
  for(let i = 0; i < size; i++) {
    grid[i] = [];
    for(let j = 0; j < size; j++) {
      grid[i][j] = Math.random() > 0.7 ? 1 : 0;
    }
  }
  res.json(grid);
});

app.post('/pathfinding/:x1/:y1/:x2/:y2', PathfindingHandler.handler);

app.post('/motors/:speed/:direction', (req, res) => {
  motorsState = {
    speed: req.params.speed,
    direction: req.params.direction
  };

  res.json(motorsState);
});
*/
/******************
 *
 * Express server
 *
 *****************/

let app = new WebServer({
  compileSASS: process.env.NODE_ENV !== "production",
  fluxPrerender: true,
  routes: {
    "/api": APIRouter
  }
});

let server = app.listen(process.env.SERVER_PORT || 8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
