import React from "react";

let GridCell = React.createClass({
  getDefaultProps() {
    return {
      blocked: false,
      onBlockedUpdate: () => {},
      position: false
    };
  },

  render() {
    return (
      <div className={ this.props.blocked ? "cell blocked" : (this.props.position ? "position cell" : "cell") } onClick={() => { this.props.onBlockedUpdate(!this.props.blocked); }}></div>
    );
  }
});

export default GridCell;
