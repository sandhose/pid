import React from "react";
import Grid from "../../common/grid_component.jsx";
import { getData } from "../../common/request.js";

export default class GridIndexPage extends React.Component {
  static fetchData(params) {
    return getData("/grid/random");
  }

  render() {
    return (
      <div id="the-grid">
        <h1>Grille aléatoire</h1>
        <Grid grid={this.props.data.grid} />
      </div>
    );
  }
}
