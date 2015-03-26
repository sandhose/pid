import AppFlux from "./AppFlux";
import MotorsServerActions from "../actions/MotorsServerActions";

export default class ServerFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsServerActions);
  }
}
