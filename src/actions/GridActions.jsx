import { Actions } from "flummox";

export default class GridActions extends Actions {
  update(content) {
    let { timestamp = Date.now(), matrix, tileSize } = content;
    return {
      timestamp,
      matrix,
      tileSize
    };
  }
}
