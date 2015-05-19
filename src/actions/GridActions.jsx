import { Actions } from "flummox";

export default class GridActions extends Actions {
  update(content) {
    let { matrix, tileSize } = content;
    return {
      timestamp: Date.now(),
      matrix,
      tileSize
    };
  }
}
