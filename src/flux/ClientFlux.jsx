import AppFlux from "./AppFlux";
import MotorsClientActions from "../actions/MotorsClientActions";

export default class ClientFlux extends AppFlux {
  createAppActions() {
    this.createActions("motors", MotorsClientActions);
  }
}
