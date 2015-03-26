import MotorsActions from "./MotorsActions";

export default class MotorsClientActions extends MotorsActions {
  update(content) {
    let state = super.update(content);
    console.log("Sending update to server", state);
    return state;
  }
}
