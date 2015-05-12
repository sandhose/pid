var PF = require("pathfinding");

var grid = null;

export default class Pathfinder {
    constructor() {
        this.finder = new PF.DjikstraFinder({
            allowDiagonal: true,
            dontCrossCorners: true,
        });
    },

    set startPoint({ x, y }) {
        if(x >= this._pfGrid.width || x < 0 || y < 0 || y >= this._pfGrid.height) {
            throw new RangeError("Start point out of bound");
        }

        this._startPoint = { x, y };
        this._path = null; // invalidate last path
    }

    get startPoint() {
        return this._startPoint;
    }

    set endPoint({ x, y }) {
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
        this._pfGrid = new PF.Grid(_grid);
    }

    get grid() {
        return this._grid;
    }

    get path() {
        if(!this._path) {
            this._path = this.finder.findPath(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y, grid);
        }
        return this._path;
    }
}
/*
module.exports = {
    handler: function(req, res) {
        var finder = new PF.DijkstraFinder({
            allowDiagonal: true,
            dontCrossCorners: true,
        });

        var path = finder.findPath(req.params.x1, req.params.y1, req.params.x2, req.params.y2, grid);
        path = PF.Util.compressPath(path);

        res.json(path);
    },
    updateGrid: function(_grid) {
        grid = new PF.Grid(_grid.length, _grid[0].length, _grid);
    }
};
*/
