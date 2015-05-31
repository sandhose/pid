import React from "react";
import { Route, DefaultRoute, RouteHandler } from "react-router";
import FluxComponent from "flummox/component";

import LandingPage from "../pages/landing/page.jsx";
import GridIndexPage from "../pages/grid/index.jsx";
import NavBar from "../components/navbar_component.jsx";
import Footer from "../components/footer_component.jsx";

export default class MainRouter extends React.Component {
  static getRoutes() {
    return (
      <Route name="app" path="/" handler={this}>
        <DefaultRoute name="landing" handler={LandingPage} />
        <Route path="grid/:action?" name="grid" handler={GridIndexPage} />
      </Route>
    );
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <main className="container">
          <FluxComponent connectToStores={["grid", "pathfinding"]} flux={this.props.flux}>
            <RouteHandler />
          </FluxComponent>
        </main>
        <Footer />
      </div>
    );
  }
}
