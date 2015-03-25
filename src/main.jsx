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
import AppFlux from "./flux/AppFlux";
const flux = new AppFlux();
let fluxData = window.unescape(document.getElementsByName('flux/data')[0].content);
flux.deserialize(fluxData);

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

// Start the router
Router.run(MainRouter.getRoutes(), Router.HistoryLocation, function(Handler, state) {
    React.render(<Handler flux={flux} />, document.getElementById(DOM_APP_EL_ID));
});
