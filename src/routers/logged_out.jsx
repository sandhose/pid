import React from "react";
import Router from "react-router";
let { Route, DefaultRoute, RouteHandler } = Router;

import LandingPage from "../pages/landing/page.jsx";
import { TestIndexPage, TestNestedPage, TestRouteHandler } from "../pages/test/index.jsx";
import { GridIndexPage } from "../pages/grid/index.jsx";
import NavBar from "../common/navbar_component.jsx";


export default class LoggedOutRouter extends React.Component {
  render() {
    return (
      <div id="container">
        <NavBar />
        <div id="main">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}

LoggedOutRouter.getRoutes = function() {
  return (
    <Route name="app" path="/" handler={LoggedOutRouter}>
      <DefaultRoute name="landing" handler={LandingPage} />
    </Route>
  );
};
