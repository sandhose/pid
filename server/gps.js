const SERVO_INTERVAL = 10;

export default class GPS {
  constructor({ arduino, bounds = { minX: 0, minY: 0, maxX: 1000, maxY: 1000 }}) {
    this.ino = arduino;
    this.ino.on("data", data => this.handleDataUpdate(data));
    this.bounds = bounds;
    this.tileSize = 10;
    this.orientation = -1;
    this.rotationDelta = 0;

    this.targetAngle = 0;
    this.lastServoAngle = 0;
    this.lastServoAngleTimestamp = Date.now() + 1000;
  }

  handleDataUpdate({ x, y, orientation }) {
    console.log({x, y, orientation });
    orientation = parseInt(orientation);
    x = parseInt(x);
    y = parseInt(y);
    if(x === undefined || y === undefined || orientation == undefined) { return; };
    if(this.lastServoAngleTimestamp + SERVO_INTERVAL >= Date.now()) {
      return;
    }

    orientation += this.rotationDelta;

    this.doRotationUpdate(orientation);
    this.handleDataUpdate({ x, y, orientation });
  }

  handleEchoUpdate({ captX, captY }) {
    let { x, y } = this.calcPosition({ x: captX, y: captY, orientation: this.orientation });
    if(x < this.bounds.minX || x > this.bounds.maxX || y < this.bounds.minY || y > this.bounds.maxY) {
      console.warn("out of bound !");
    }

    this.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, x));
    this.y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, y));
  }

  doRotationUpdate(rotation) {
    let newOrientation = this.calcTargetOrientation(rotation, this.orientation);
    if(newOrientation == this.orientation) return; // No need to change

    this.orientation = newOrientation;
    this.sendServoAngle(this.calcServoAngle(rotation, newOrientation));
  }

  calcPosition({ x, y, orientation }) { // TODO: Need room bounds !
    if(orientation == 0) {
      return { x, y };
    } else if(orientation == 1) {
      return { x: -y, y: x };
    } else if(orientation == 2) {
      return { x: -y, y: x };
    } else if(orientation == 3) {
      return { x: y, y: -x };
    }
  }

  calcTargetOrientation(deviceRotation, lastOrientation) {
    let targetAngle = lastOrientation * 90;
    let angleDelta = deviceRotation - targetAngle;
    if(angleDelta > 180) angleDelta -= 360;

    if(angleDelta >= -70 && angleDelta <= 70) return lastOrientation;

    return (Math.round(deviceRotation / 90) + 4) % 4;
  }

  calcServoAngle(deviceRotation, targetOrientation) {
    let targetAngle = targetOrientation * 90;
    let angleDelta = deviceRotation - targetAngle;
    if(angleDelta > 180) angleDelta -= 360;

    if(angleDelta <= -90 || angleDelta >= 90) throw new RangeError("targetOrientation not reachable");

    return angleDelta + 90; // Angle: [-90, 90] -> [0, 180]
  }

  sendServoAngle(angle) {
    console.log("sending angle", angle)
    this.ino.sendData({ servo: angle });
    this.lastServoAngle = angle;
    this.lastServoAngleTimestamp = Date.now();
  }

  set bounds({ minX, minY, maxX, maxY }) {
    if(minX > maxX) {
      console.warn("minX > maxX !");
      [ minX, maxX ] = [ maxX, minX ];
    }
    if(minY > maxY) {
      console.warn("minY > maxY !");
      [ minY, maxY ] = [ maxY, minY ];
    }

    this._bounds = { minX, minY, maxX, maxY };
    console.log("grid bounds:", this._bounds);
  }

  get bounds() {
    return this._bounds;
  }

  get position() {
    return {
      tile: {
        x: Math.floor(this.x / this.tileSize),
        y: Math.floor(this.y / this.tileSize)
      },
      real: {
        x: this.x,
        y: this.y
      }
    };
  }
}
