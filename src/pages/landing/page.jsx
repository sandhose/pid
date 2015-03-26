import React from "react";

export default class LandingPage extends React.Component {
  render() {
    const title = "Landing Page";
    const handleUpdate = (speed, direction) => { this.props.flux.getActions("motors").update({ speed, direction }); };
    const handleClick = (e) => { handleUpdate(
        Math.ceil(Math.random() * 20) / 10 - 1,
        Math.ceil(Math.random() * 20) / 10 - 1);
    };

    return (
      <div id="landing-page">
        <h1>{title}</h1>
        <div>Motors speed: {this.props.speed}</div>
        <div>Motors direction: {this.props.direction}</div>
        <button onClick={handleClick}>Update !</button>
      </div>
    );
  }
}
