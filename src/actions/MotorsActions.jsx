import { Actions } from "flummox";

export default class MotorsActions extends Actions {
  update(content) {
    let { speed, direction } = content;
    return {
      speed,
      direction
    };
  }
}
