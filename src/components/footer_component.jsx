import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">État du système</h5>
            </div>
            <div className="col offset-l2 l4 s12">
              <h5 className="white-text">Lorem ipsum</h5>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Projet par Jean-David Hamid, Lionel Jung, Simon Mastio et Quentin Gliech
          </div>
        </div>
      </footer>
    );
  }
}

