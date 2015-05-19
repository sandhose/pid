import GridActions from "./GridActions";
import axios from "axios";

export default class GridClientActions extends GridActions {
  update(content) {
    let state = super.update(content);
    axios.post("/api/grid/", content);
    return state;
  }
}
