import React from "react";
import { RouteHandler } from "react-router";

let TestRouteHandler = React.createClass({
  render() {
    return (
      <div id="test-route-handler">
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default TestRouteHandler;
