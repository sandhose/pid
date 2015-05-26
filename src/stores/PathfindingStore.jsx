import { Store } from "flummox";

export default class GridStore extends Store {
  constructor(flux) {
    super();

    const gridActions = flux.getActions("grid");
    this.register(gridActions.update, this.handleUpdate);
    this.register(gridActions.reload, this.handleUpdate);

    this.state = {
      grid: {
        timestamp: 0,
        matrix: [[]],
        tileSize: 10
      }
    };
  }

  handleUpdate(content) {
    console.log("grid update", content);
    this.setState({ grid: content });
  }

  handleSave(content) {
    console.log("saved grid", content);
    this.setState({ grid: content });
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  static deserialize(data) {
    return JSON.parse(data);
  }
}
