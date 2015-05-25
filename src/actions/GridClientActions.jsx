import GridActions from "./GridActions";
import axios from "axios";

export default class GridClientActions extends GridActions {
  async save({ matrix, tileSize }) {
    let resp = await axios.post("/api/grid/", { matrix, tileSize });
    return resp.data;
  }

  async reload() {
    let resp = await axios.get("/api/grid/");
    return resp.data;
  }
}
