import { Store } from "flummox";

export default class MotorsStore extends Store {
  constructor(flux) {
    super();

    const motorsActions = flux.getActions("motors");
    this.register(motorsActions.update, this.handleUpdate);

    this.state = {
      speed: 1,
      direction: 0
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
