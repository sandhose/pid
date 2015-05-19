import React from "react";
import { Route, DefaultRoute, RouteHandler } from "react-router";
import FluxComponent from "flummox/component";

import LandingPage from "../pages/landing/page.jsx";
import GridIndexPage from "../pages/grid/index.jsx";
import NavBar from "../components/navbar_component.jsx";

export default class MainRouter extends React.Component {
  static getRoutes() {
    return (
      <Route name="app" path="/" handler={this}>
        <DefaultRoute name="landing" handler={LandingPage} />
        <Route name="grid" path="grid" handler={GridIndexPage} />
      </Route>
    );
  }

  render() {
    return (
      <div id="container">
        <FluxComponent flux={this.props.flux} connectToStores={["motors", "grid"]}>
          <NavBar />
          <RouteHandler />
        </FluxComponent>
      </div>
    );
  }
}
