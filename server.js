import express from "express";
import compression from "compression";
import sass from "node-sass";
import path from "path";
import React from "react";
import Router from "react-router";
import MainRouter from "./src/routers/main";
import PathfindingHandler from "./server/pathfinding";
import { readFileSync } from "fs";
import ServerFlux from "./src/flux/ServerFlux";

let motorsState = { speed: 0, direction: 0 };

let indexPage = readFileSync(path.join(__dirname, "/build/index.html")).toString();
let app = express();
app.use(compression());

PathfindingHandler.updateGrid([
  [1, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1]
]);

if(process.env.NODE_ENV !== "production") {
  app.get("/style.css", (req, res) => {
    let result = sass.renderSync({
      file: path.join(__dirname, "sass/style.scss"),
      outFile: path.join(__dirname, ".tmp/style.css"),
      sourceMap: true,
      sourceMapEmbed: true,
      sourceMapContents: true
    });

    console.log(result);

    res.type("css");
    res.send(result.css);
    res.end();
  });
}

app.use(express.static("build", { index: false }));

app.get('*', (req, res) => {
  let flux = new ServerFlux();
  flux.populateData({ motors: motorsState });

  Router.run(MainRouter.getRoutes(), req.url, (Handler, state) => {
    let app = React.renderToString(<Handler flux={flux} />);
    let fluxData = flux.serialize();
    res.send(
        indexPage
        .replace("<!-- AppNode -->", app)
        .replace("<!-- FluxData -->", encodeURIComponent(fluxData))
    );
  });
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

/******************
 *
 * Express server
 *
 *****************/

let server = app.listen(process.env.SERVER_PORT || 8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
