import { Store } from "flummox";

export default class PathfindingStore extends Store {
  constructor(flux) {
    super();

    const pathfindingActions = flux.getActions("pathfinding");
    this.register(pathfindingActions.update, this.handleUpdate);

    this.state = {
      path: []
    };
  }

  handleUpdate(content) {
    console.log("path update", content);
    this.setState(content);
  }

  static serialize(state) {
    console.log("serialize state", state);
    return JSON.stringify(state);
  }

  static deserialize(data) {
    return JSON.parse(data);
  }
}
