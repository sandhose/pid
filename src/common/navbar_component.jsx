import React from "react";

import { StyleResolverMixin, BrowserStateMixin } from "radium";

let NavBar = React.createClass({
  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  render() {
    var styles = {
      background: "#EEE",
      borderBottom: "solid 1px #AAA",
      flex: 0,
      padding: "16px"
    };
    return (
      <div style={this.buildStyles(styles)}>Navbar</div>
    );
  }
});

export default NavBar;
