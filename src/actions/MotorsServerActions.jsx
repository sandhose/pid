import MotorsActions from "./MotorsActions";

export default class MotorsServerActions extends MotorsActions {
  update(content) {
    let state = super.update(content);
    console.log("Broadcasting update", state);
    return state;
  }
}
