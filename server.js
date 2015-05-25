import APIRouter from "./server/apiRouter";
import WebServer from "./server/webserver";
import MainManager from "./server/mainManager";
import low from "lowdb";

let mainManager = new MainManager({
  database: low("db.json")
});

let apiRouter = new APIRouter({
  manager: mainManager
});

let app = new WebServer({
  compileSASS: process.env.NODE_ENV !== "production",
  fluxPrerender: true,
  routes: {
    "/api": apiRouter
  }
});

let server = app.listen(process.env.SERVER_PORT || 8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
