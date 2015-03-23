var PF = require("pathfinding");

var grid = null;

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