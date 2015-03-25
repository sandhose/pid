import { Actions } from "flummox";

export default class MotorsActions extends Actions {
  update(content) {
    let { speed, direction } = content;
    console.log("Setting speed to %s and direction to %s", speed, direction);
    return {
      speed,
      direction
    };
  }
}
