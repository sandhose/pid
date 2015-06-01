import PathfindingActions from "./PathfindingActions";
import axios from "axios";

export default class PathfindingClientActions extends PathfindingActions {
  update(content) {
    let state = super.update(content);
    return state;
  }

  async reload() {
    let resp = await axios.get("/api/path");
    console.log(resp);
    return { path: resp.data };
  }

  async changeTarget({ x, y }) {
    let resp = await axios.post("/api/target", { x, y });
    return resp.data;
  }
}
