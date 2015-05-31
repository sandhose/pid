import path from "path";
import { readFileSync } from "fs";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import sass from "node-sass";
import Router from "react-router";
import React from "react";

import ServerFlux from "../src/flux/ServerFlux";
import MainRouter from "../src/routers/main";


export default class WebServer {
  constructor({ compileSASS = false, fluxPrerender = true, routes = {} }) {
    this.app = express();
    this.indexPage = readFileSync(path.join(__dirname, "../build/index.html")).toString();

    this.app.use(compression());
    this.app.use(bodyParser.json());

    if(compileSASS) {
      this.app.get("/style.css", (req, res) => {
        let result = sass.renderSync({
          file: path.join(__dirname, "../sass/style.scss"),
          outFile: path.join(__dirname, "../.tmp/style.css"),
          includePaths: [path.join(__dirname, "../node_modules/materialize-sass/sass/")],
          sourceMap: true,
          sourceMapEmbed: true,
          sourceMapContents: true
        });

        res.type("css");
        res.send(result.css);
        res.end();
      });
    }

    this.app.use("/font", express.static("node_modules/materialize-sass/font/", { index: false }));
    this.app.use(express.static("build", { index: false }));

    for(let route in routes) {
      this.app.use(route, routes[route].router);
    }

    this.api = routes["/api"].handlers;

    if(fluxPrerender) {
      this.app.get("*", (req, res) => {
        let flux = new ServerFlux();
        flux.populateData({
          grid: this.api["/grid"].GET(),
          motors: { direction: 0, speed: 0 },
          pathfinding: { path: this.api["/path"].GET() }
        });

        Router.run(MainRouter.getRoutes(), req.url, (Handler, state) => {
          let app = React.renderToString(<Handler flux={flux} />);
          let fluxData = flux.serialize();
          console.log(fluxData);
          res.send(
            this.indexPage
              .replace("<!-- AppNode -->", app)
              .replace("<!-- FluxData -->", encodeURIComponent(fluxData))
          );
        });
      });
    }
    else {
      this.app.get("*", (req, res) => {
        res.send(this.indexPage.replace("<!-- FluxData -->", ""));
      });
    }
  }

  listen(...args) {
    return this.app.listen.apply(this.app, args);
  }

  use(...args) {
    return this.app.use.apply(this.app, args);
  }
}
