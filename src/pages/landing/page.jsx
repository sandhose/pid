import React from "react";
import { getData } from "../../common/request";


let LandingPage = React.createClass({
  statics: {
    fetchData(params) {
      return getData("/landing", {}, "POST");
    }
  },

  componentWillMount() {
    console.log("[LandingPage] will mount with server response: ", this.props.data.landing);
  },

  render() {
    let { title } = this.props.data.landing;

    return (
      <div id="landing-page">
        <h1>{title}</h1>
	<div>Hot loading, yay !</div>
      </div>
    );
  }
});


export default LandingPage;
