import React from "react";
import TestRouteHandler from "./route-handler.jsx";
import TestNestedPage from "./nested.jsx";

let TestIndexPage = React.createClass({
  render() {
    return (
      <div id="test-page">
        <h1>Test Page</h1>
      </div>
    );
  }
});

export default {
  TestIndexPage,
  TestRouteHandler,
  TestNestedPage
};
