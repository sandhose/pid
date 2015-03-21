import React from "react";
import Grid from "../../common/grid_component.jsx";
import { getData } from "../../common/request.js";

let GridIndexPage = React.createClass({
  statics: {
    fetchData(params) {
      return getData("/grid/random");
    }
  },

  render() {
    let style = {
      display: "flex",
      flexDirection: "column",
      height: "200px",
      width: "200px"
    };

    return (
      <div id="the-grid">
        <h1>Grille aléatoire</h1>
        <Grid grid={this.props.data.grid} />
      </div>
    );
  }
});

export default {
  GridIndexPage
};
