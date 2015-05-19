import Arduino from "./arduino";
import Pathfinder from "./pathfinding";
import GPS from "./gps";
import low from "lowdb";
let debug = require("debug")("manager");

export default class MainManager {
  constructor({ database }) {
    if(!database) {
      throw new Error("no database provided");
    }
    this.db = database;
    this.ino = new Arduino();
    this.pf = new Pathfinder();
    this.gps = new GPS({ arduino: this.ino });
    this.grid = null;

    this.loadFromDB();
  }

  loadFromDB() {
    debug("loading grid from db");
    let grid = this.db("grids").last();
    if(grid) {
      console.log("loaded grid from db", grid);
      this.grid = grid;
      this._propGridUpdate();
    }
  }

  updateGrid(_grid) {
    this.db("grids").push({
      timestamp: Date.now(),
      matrix: _grid.matrix,
      tileSize: _grid.tileSize
    });
    this.grid = this.db("grids").last();

    this._propGridUpdate();

    return this.grid;
  }

  _propGridUpdate() {
    this.pf.grid = this.grid.matrix;

    this.gps.bounds = {
      minX: 0,
      minY: 0,
      maxX: this.grid.tileSize * this.grid.matrix[0].length,
      maxY: this.grid.tileSize * this.grid.matrix.length
    };
    this.gps.tileSize = this.grid.tileSize;

  }
}
