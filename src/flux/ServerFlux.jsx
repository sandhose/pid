import AppFlux from "./AppFlux";
import MotorsActions from "../actions/MotorsActions";

export default class ServerFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsActions);
  }

  populateData({ motors }) {
    this.getActions("motors").update(motors);
  }
}
