import AppFlux from "./AppFlux";
import GridClientActions from "../actions/GridClientActions";
import PathfindingClientActions from "../actions/PathfindingClientActions";
import MotorsClientActions from "../actions/MotorsClientActions";

export default class ClientFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsClientActions);
    this.createActions("grid", GridClientActions);
    this.createActions("pathfinding", PathfindingClientActions);
  }

  setRouter(router) {
    super.setRouter(router);
    this.getStore("grid").register(this.getActions("grid").save, (content) => {
      this.getStore("grid").handleSave(content);
      router.transitionTo("grid");
    });
  }
}
