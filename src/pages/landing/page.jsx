import React from "react";
import Grid from "../../components/grid_component.jsx";
import PathOverlay from "../../components/path_overlay_component.jsx";

export default class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className="grid-container" style={{
            height: this.props.grid.tileSize * this.props.grid.matrix.length,
            width: this.props.grid.tileSize * this.props.grid.matrix[0].length
        }}>
          <Grid grid={this.props.grid} />
          <PathOverlay path={this.props.path} grid={this.props.grid} />
        </div>
      </div>
    );
  }
}
