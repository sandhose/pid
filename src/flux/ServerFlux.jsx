import AppFlux from "./AppFlux";
import MotorsActions from "../actions/MotorsActions";
import GridActions from "../actions/GridActions";
import PathfindingActions from "../actions/PathfindingActions";

export default class ServerFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsActions);
    this.createActions("grid", GridActions);
    this.createActions("pathfinding", PathfindingActions);
  }

  populateData({ motors, grid, pathfinding }) {
    this.getActions("motors").update(motors);
    this.getActions("grid").update(grid);
    this.getActions("pathfinding").update(pathfinding);
  }
}
