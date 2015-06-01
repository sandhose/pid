import PF from "pathfinding";

export default class Pathfinder {
    constructor() {
        this.finder = new PF.DijkstraFinder({
            allowDiagonal: true,
            dontCrossCorners: true,
        });
    }

    getFinder() {
        return this.finder;
    }

    set startPoint({ x, y }) {
        if(x > this._pfGrid.width || x < 0 || y < 0 || y > this._pfGrid.height) {
            throw new RangeError("Start point out of bound");
        }

        this._startPoint = { x, y };
        this._path = null; // invalidate last path
    }

    get startPoint() {
        return this._startPoint;
    }

    set endPoint({ x, y }) {
        console.log("changing endpoint", { x, y });
        if(x >= this._pfGrid.width || x < 0 || y < 0 || y >= this._pfGrid.height) {
            throw new RangeError("End point out of bound");
        }

        this._endPoint = { x, y };
        this._path = null; // invalidate last path
    }

    get endPoint() {
        return this._endPoint;
    }

    set grid(_grid) {
        this._grid = _grid;
        this._pfGrid = new PF.Grid(_grid[0].length, _grid.length, _grid);
    }

    get grid() {
        return this._grid;
    }

    get path() {
        if(!this._path) {
            console.log("generating new path", {
                startPoint: this._startPoint,
                endPoint: this._endPoint
            });
            let finder = this.getFinder();
            this._pfGrid = new PF.Grid(this._grid[0].length, this._grid.length, this._grid);
            this._path = finder.findPath(this._startPoint.x, this._startPoint.y, this._endPoint.x, this._endPoint.y, this._pfGrid);
        }
        return this._path;
    }
}
