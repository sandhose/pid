import React from "react";
import GridCell from "./grid_cell_component.jsx";

const GRID_SCALE = 1; // 1 unit = X px

let Grid = React.createClass({
  getDefaultProps() {
    return {
      editing: false,
      grid: {
        matrix: [
          [0, 0, 0],
          [0, 0, 0]
        ]
      },
      position: { x: null, y: null }
    };
  },
  getInitialState() {
    return {
      grid: this.props.grid,
      height: this.props.grid.matrix.length,
      width: this.props.grid.matrix[0].length,
      tileSize: this.props.grid.tileSize
    }
  },
  componentWillReceiveProps(nextProps) {
    console.log("new props", nextProps);
    this.setState({
      grid: nextProps.grid
    });
  },
  render() {
    let view = (
      this.state.grid.matrix.map((row, rowIndex) => {
        return (<div className="line" key={rowIndex}>{
          row.map((cell, cellIndex) => {
            return <GridCell key={rowIndex*100 + cellIndex} onBlockedUpdate={(blocked) => { this.updateCell(rowIndex, cellIndex, blocked) }} blocked={Boolean(cell)} selected={this.props.position.x === rowIndex && this.props.position.y === cellIndex} />;
          })
        }</div>);
      })
    );

    return <div className={ this.props.editing ? "grid editing" : "grid" }  style={{
      width: this.state.grid.tileSize * this.state.grid.matrix[0].length * GRID_SCALE,
      height: this.state.grid.tileSize * this.state.grid.matrix.length * GRID_SCALE
    }}>{view}</div>;
  },
  updateCell(row, column, blocked) {
    if(this.props.editing) {
      let state = this.state;
      state.grid.matrix[row][column] = blocked ? 1 : 0;
      this.setState(state);
    }
  },
  resetState() {
    //setTimeout(() => {
      this.setState({
        grid: this.props.grid
      });
    //}, 10);
    console.log("state reset");
  }
});

export default Grid;
