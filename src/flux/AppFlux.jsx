import { Flux } from "flummox";
import MotorsStore from "../stores/MotorsStore";
import GridStore from "../stores/GridStore";
import PathfindingStore from "../stores/PathfindingStore";

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createAppActions();
    this.createStore("motors", MotorsStore, this);
    this.createStore("grid", GridStore, this);
    this.createStore("pathfinding", PathfindingStore, this);
  }

  setRouter(router) {
    this.router = router;
  }

  createAppActions() {
    console.warn("No App Actions registered");
  }
}
