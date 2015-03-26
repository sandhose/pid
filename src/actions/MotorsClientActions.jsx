import MotorsActions from "./MotorsActions";
import axios from "axios";

export default class MotorsClientActions extends MotorsActions {
  update(content) {
    let state = super.update(content);
    axios.post(`/motors/${content.speed}/${content.direction}`);
    return state;
  }
}
