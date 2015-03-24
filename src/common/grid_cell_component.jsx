import React from "react";

let GridCell = React.createClass({
  getDefaultProps() {
    return {
      blocked: false
    };
  },

  render() {
    return (
      <div classList="cell"></div>
    );
  }
});

export default GridCell;
