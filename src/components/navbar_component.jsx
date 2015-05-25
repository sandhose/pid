import React from "react";
import { Link } from "react-router";

class NavLink extends Link {
  render() {
    return <li className={this.getActiveState() ? "active" : "" }>{super.render()}</li>;
  }
}

export default class NavBar extends React.Component {
  render() {
    return (
        <header>
          <nav>
            <div className="nav-wrapper container">
              <ul>
                <NavLink activeClassName="active" to="landing">Home</NavLink>
                <NavLink activeClassName="active" to="grid">Grid</NavLink>
              </ul>
            </div>
          </nav>
        </header>
    );
  }
};
