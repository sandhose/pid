import AppFlux from "./AppFlux";
import MotorsActions from "../actions/MotorsActions";
import GridActions from "../actions/GridActions";

export default class ServerFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsActions);
    this.createActions("grid", GridActions);
  }

  populateData({ motors, grid }) {
    this.getActions("motors").update(motors);
    this.getActions("grid").update(grid);
  }
}
