import React from "react";
import GridCell from "./grid_cell_component.jsx";

let Grid = React.createClass({
  getDefaultProps() {
    return {
      grid: [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    };
  },
  render() {
    let view = (
      this.props.grid.map((row, rowIndex) => {
        return (<div key={rowIndex}>{
          row.map((cell, cellIndex) => {
            return <GridCell key={rowIndex*100 + cellIndex} blocked={Boolean(cell)} />;
          })
        }</div>);
      })
    );
    console.log(view);
    return <div>{view}</div>;
  }
});

export default Grid;
