import { Router } from "express";

export default class APIRouter {
  constructor({ manager }) {
    if(!manager) {
      throw new Error("no manager specified");
    }

    this._manager = manager;
    this.router = new Router();

    this.handlers = {
      "/grid": {
        "POST": (data) => {
          return this._manager.updateGrid(data);
        },
        "GET": () => {
          return this._manager.grid;
        }
      }
    };

    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/hello-world", (req, res) => {
      res.json({ hello: "world" });
    });

    this.router.route("/grid")
      .post((req, res) => {
        res.json(this.handlers["/grid"].POST(req.body));
      })
      .get((req, res) => {
        res.json(this.handlers["/grid"].GET());
      });

    this.router.route("/position")
      .post((req, res) => {
        this._manager.gps.handleEchoUpdate(req.body);
        res.json(this._manager.gps.position);
      })
      .get((req, res) => {
        res.json(this._manager.gps.position);
      });
  }
}
