import { Actions } from "flummox";

export default class PathfindingActions extends Actions {
  update(content) {
    console.log("updating pf", content);
    let { path } = content;
    return {
      path
    };
  }
}
