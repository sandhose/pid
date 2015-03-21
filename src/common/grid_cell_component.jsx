import React from "react";
import { StyleResolverMixin, BrowserStateMixin } from "radium";

let GridCell = React.createClass({
  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getDefaultProps() {
    return {
      blocked: false
    };
  },

  render() {
    let style = {
      flex: 1,
      background: "white",
      border: "solid 1px #CCC",

      modifiers: [{
        blocked: {
          background: "#CCC",
        }
      }],

      states: [{
        hover: {
          background: "#AAA"
        }
      }]

    };
    return (
      <div style={this.buildStyles(style)} {...this.getBrowserStateEvents()}></div>
    );
  }
});

export default GridCell;
