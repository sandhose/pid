import React from "react";
import { StyleResolverMixin, BrowserStateMixin } from "radium";
import GridCell from "./grid_cell_component.jsx";

let Grid = React.createClass({
  mixins: [ StyleResolverMixin, BrowserStateMixin ],

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
    let rowStyles = this.buildStyles({
      flex: 1,
      display: "flex"
    });

    let gridStyles = this.buildStyles({
      display: "flex",
      flexDirection: "column",
      height: "200px",
      width: "200px"
    });

    let view = (
      this.props.grid.map((row, rowIndex) => {
        return (<div key={rowIndex} style={rowStyles}>{
          row.map((cell, cellIndex) => {
            return <GridCell key={rowIndex*100 + cellIndex} blocked={Boolean(cell)} />;
          })
        }</div>);
      })
    );
    console.log(view);
    return <div style={gridStyles}>{view}</div>;
  }
});

export default Grid;
