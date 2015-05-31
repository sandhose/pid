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
        "POST": ({ matrix, tileSize }) => {
          return this._manager.updateGrid({ matrix, tileSize });
        },
        "GET": () => {
          return this._manager.grid;
        }
      },
      "/path": {
        "GET": () => {
          return this._manager.pf.path;
        }
      },
      "/target": {
        "GET": () => {
          return this._manager.pf.endPoint;
        },
        "POST": ({ x, y }) => {
          this._manager.pf.endPoint = { x, y };
          return this._manager.pf.endPoint;
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

    this.router.get("/path", (req, res) => {
      res.json(this.handlers["/path"].GET());
    });

    this.router.route("/position")
      .post((req, res) => {
        this._manager.gps.handleEchoUpdate(req.body);
        res.json(this._manager.gps.position);
      })
      .get((req, res) => {
        res.json(this._manager.gps.position);
      });

    this.router.route("/target")
      .post((req, res) => {
        res.json(this.handlers["/target"].POST(req.body));
      })
      .get((req, res) => {
        res.json(this.handlers["/target"].GET());
      });
  }
}
