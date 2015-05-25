/**
 * App entry point
 */

// Polyfill
import "babel-core/polyfill";

// Libraries
import React from "react";
import Router from "react-router";

// Routers
import MainRouter from "./routers/main";

// Flux
import ClientFlux from "./flux/ClientFlux";
const flux = new ClientFlux();
let fluxData = window.unescape(document.getElementsByName('flux/data')[0].content);
flux.deserialize(fluxData);

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

// Start the router
let router = Router.run(MainRouter.getRoutes(), Router.HistoryLocation, function(Handler, state) {
    React.render(<Handler flux={flux} />, document.getElementById(DOM_APP_EL_ID));
});

flux.setRouter(router);
