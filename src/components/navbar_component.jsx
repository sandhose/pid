import React from "react";
import { Link } from "react-router";

let NavBar = React.createClass({

  render() {
    return (
        <ul>
          <Link to="landing">Home</Link>
          <Link to="grid">Grid</Link>
        </ul>
    );
  }
});

export default NavBar;
