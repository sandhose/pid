import { Router } from "express";

export default class APIRouter {
  constructor({ manager }) {
    if(!manager) {
      throw new Error("no manager specified");
    }

    this._manager = manager;
    this.router = new Router();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/hello-world", (req, res) => {
      res.json({ hello: "world" });
    });

    this.router.route("/grid")
      .post((req, res) => {
        res.json(this._manager.updateGrid(req.body));
      })
      .get((req, res) => {
        res.json(this._manager.grid);
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
