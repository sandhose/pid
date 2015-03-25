import React from "react";
import Grid from "../../components/grid_component.jsx";

export default class GridIndexPage extends React.Component {
  render() {
    let grid = [[0,0,0], [0,0,0], [0,0,0]];
    return (
      <div id="the-grid">
        <h1>Grille aléatoire</h1>
        <Grid grid={grid} />
      </div>
    );
  }
}
