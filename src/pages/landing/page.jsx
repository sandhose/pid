import React from "react";
import Grid from "../../components/grid_component.jsx";
import PathOverlay from "../../components/path_overlay_component.jsx";

export default class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className="grid-container" ref="container" style={{
            height: this.props.grid.tileSize * this.props.grid.matrix.length,
            width: this.props.grid.tileSize * this.props.grid.matrix[0].length
        }}>
          <Grid grid={this.props.grid} position={this.props.position} />
          <PathOverlay path={this.props.path} grid={this.props.grid} onClick={this.handleClick()} />
        </div>
      </div>
    );
  }

  handleClick(evt) {
    return (evt) => {
      let container = React.findDOMNode(this.refs.container);
      let { x, y } = {
        x: Math.floor((evt.pageX - container.offsetLeft) / this.props.grid.tileSize),
        y: Math.floor((evt.pageY - container.offsetTop) / this.props.grid.tileSize)
      };

      this.props.flux.getActions("pathfinding").changeTarget({ x, y });
    }
  }
}
