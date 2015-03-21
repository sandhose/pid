import React from "react";
import Router from "react-router";
let { Route, DefaultRoute, RouteHandler } = Router;
import { StyleResolverMixin, BrowserStateMixin } from "radium";

import LandingPage from "../pages/landing/page.jsx";
import { TestIndexPage, TestNestedPage, TestRouteHandler } from "../pages/test/index.jsx";
import { GridIndexPage } from "../pages/grid/index.jsx";
import NavBar from "../common/navbar_component.jsx";


let LoggedOutRouter = React.createClass({
  mixins: [ StyleResolverMixin, BrowserStateMixin ],
  statics: {
    getRoutes() {
      return (
        <Route name="app" path="/" handler={LoggedOutRouter}>
          <DefaultRoute name="landing" handler={LandingPage} />
          <Route name="test" path="/test/" handler={TestRouteHandler}>
            <DefaultRoute name="test-index" handler={TestIndexPage} />
            <Route name="test-nested" path="nested/" handler={TestNestedPage} />
          </Route>
          <Route name="grid" path="/grid/" handler={GridIndexPage} />
        </Route>
      );
    }
  },

  styles: {
    container: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    main: {
      flex: 1
    }
  },

  render() {
    return (
      <div id="container" style={this.buildStyles(this.styles.container)}>
        <NavBar />
        <div id="main" style={this.buildStyles(this.styles.main)}>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});


export default LoggedOutRouter
