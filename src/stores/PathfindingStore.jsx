import { Store } from "flummox";

export default class PathfindingStore extends Store {
  constructor(flux) {
    super();

    const pathfindingActions = flux.getActions("pathfinding");
    this.register(pathfindingActions.update, this.handlePathUpdate);
    this.register(pathfindingActions.reload, this.handlePathUpdate);
    this.register(pathfindingActions.changeTarget, this.changeTarget);

    this._flux = flux;

    this.state = {
      path: [],
      target: { x: 0, y: 0 },
      position: { x: 0, y: 0 }
    };
  }

  handlePathUpdate({ path, target, position }) {
    console.log("path update", path);
    this.setState({ path });
    if(position) this.setState({ position });
    if(target) this.setState({ target });
  }

  changeTarget({ x, y }) {
    console.log("changing target");
    this.setState({ target: { x, y }});
    setTimeout(() => this._flux.getActions("pathfinding").reload(), 100);
  }

  static serialize(state) {
    console.log("serialize state", state);
    return JSON.stringify(state);
  }

  static deserialize(data) {
    return JSON.parse(data);
  }
}
