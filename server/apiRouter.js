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
      "/position": {
        "GET": () => {
          return this._manager.gps.position;
        },
        "POST": (data) => {
          this._manager.gps.handleEchoUpdate(data);
          return this._manager.gps.position;
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
        res.json(this.handlers["/position"].POST(req.body));
      })
      .get((req, res) => {
        res.json(this.handlers["/position"].GET());
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
