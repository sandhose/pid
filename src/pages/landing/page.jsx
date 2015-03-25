import React from "react";

export default class LandingPage extends React.Component {
  render() {
    let title = "Landing Page";

    return (
      <div id="landing-page">
        <h1>{title}</h1>
        <div>Motors speed: {this.props.speed}</div>
        <div>Motors direction: {this.props.direction}</div>
      </div>
    );
  }
}
