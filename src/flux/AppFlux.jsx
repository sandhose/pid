import { Flux } from "flummox";
import MotorsStore from "../stores/MotorsStore";

export default class AppFlux extends Flux {
  constructor() {
    super();

    this.createAppActions();
    this.createStore("motors", MotorsStore, this);
  }

  createAppActions() {
    console.warn("No App Actions registered");
  }
}
