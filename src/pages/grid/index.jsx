import React from "react";
import Grid from "../../components/grid_component.jsx";

export default class GridIndexPage extends React.Component {
  render() {
    let grid = [[0,0,0], [0,0,0], [0,0,0]];
    return (
      <div id="the-grid">
        <h1>Carte de l'environnement</h1>
        <Grid grid={grid} />
      </div>
    );
  }
}
