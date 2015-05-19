import AppFlux from "./AppFlux";
import GridClientActions from "../actions/GridClientActions";
import MotorsClientActions from "../actions/MotorsClientActions";

export default class ClientFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsClientActions);
    this.createActions("grid", GridClientActions);
  }
}
