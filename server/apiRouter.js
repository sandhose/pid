import { Router } from "express";

let APIRouter = Router();

APIRouter.get("/hello-world", (req, res) => {
  res.json({ hello: "world" });
});

export default APIRouter;
