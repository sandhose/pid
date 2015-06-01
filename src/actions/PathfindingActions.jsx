import { Actions } from "flummox";

export default class PathfindingActions extends Actions {
  update(content) {
    console.log("updating pf", content);
    let { path, target, position } = content;
    return {
      path,
      target,
      position
    };
  }

  reload() {
    let { path } = { path: [] };
    return {
      path
    };
  }

  changeTarget({ x, y }) {
    return { x, y };
  }
}
