import { Flux } from "flummox";
import MotorsActions from "../actions/MotorsActions";
import MotorsStore from "../stores/MotorsStore";

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createActions("motors", MotorsActions);
    this.createStore("motors", MotorsStore, this);
  }
}
