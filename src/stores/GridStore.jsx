import { Store } from "flummox";

export default class GridStore extends Store {
  constructor(flux) {
    super();

    const gridActions = flux.getActions("grid");
    this.register(gridActions.update, this.handleUpdate);

    this.state = {
      grid: {
        timestamp: 0,
        matrix: [],
        tileSize: 10
      }
    };
  }

  handleUpdate(content) {
    this.setState(content);
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  static deserialize(data) {
    return JSON.parse(data);
  }
}
