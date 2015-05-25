import React from "react";

let GridCell = React.createClass({
  getDefaultProps() {
    return {
      blocked: false,
      onBlockedUpdate: () => {}
    };
  },

  render() {
    return (
      <div className={ this.props.blocked ? "cell blocked" : "cell" } onClick={() => { this.props.onBlockedUpdate(!this.props.blocked); }}></div>
    );
  }
});

export default GridCell;
