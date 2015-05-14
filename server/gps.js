export default class GPS {
  constructor({ arduino, bounds = { minX: 0, minY: 0, maxX: 1000, maxY: 1000 }}) {
    this.ino = arduino;
    this.ino.on("data", data => this.handleEchoUpdate({ x: data.x, y: data.y }));
    this.bounds = bounds;
    this.tileSize = 10;
  }

  handleEchoUpdate({ x, y }) {
    if(x < this.bounds.minX || x > this.bounds.maxX || y < this.bounds.minY || y > this.bounds.maxY) {
      console.warn("out of bound !");
    }

    this.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, x));
    this.y = Math.max(this.bounds.minY, Math.min(this.bounds.maxY, y));
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
