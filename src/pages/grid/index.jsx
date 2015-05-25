import React from "react";
import { FluxComponent } from "flummox";
import Grid from "../../components/grid_component.jsx";
import RelativeDate from "../../components/relativedate_component.jsx";
import { Link, State } from "react-router";

let GridIndexPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return {
      height: this.props.grid.matrix.length,
      width: this.props.grid.matrix[0].length,
      tileSize: this.props.grid.tileSize,
      editing: this.isEditing()
    }
  },
  render() {
    let editing = this.state.editing;
    let saving = this.context.router.isActive("grid", { action: "save" });
    return (
      <div id="the-grid" className="row">
        <h1>Carte de l'environnement</h1>
        <div className="col l6 s12">
          <div className="card">
            <div className="card-content">
              <Grid ref="grid" grid={this.props.grid} editing={editing} />
            </div>
            <div className="card-action">
              <div className="right">
                {(() => {
                  if(editing) {
                    return <span><Link to="grid" params={{ action: "save" }}>Sauvegarder</Link><Link to="grid">Annuler</Link></span>
                  }
                  else if(saving) {
                  }
                  else {
                    return <Link to="grid" params={{action: "edit"}}>Modifier</Link>
                  }
                })()}
              </div>
              {
                saving ? <div className="progress"><div className="indeterminate"></div></div>
                : <span>Carte modifiée <RelativeDate timestamp={this.props.grid.timestamp} /></span>
              }
            </div>
          </div>
        </div>
        <div className="col l4 s12 offset-l2">
          <div className="card">
            { this.state.editing ? (
            <div className="card-content">
              <h4>Propriétés</h4>
              <div className="row">
                <div className="input-field col s6">
                  <input placeholder="10" type="number" onChange={this.changeRect} value={this.state.width} min="0" max="100" step="1" id="grid_width" ref="gridWidthInput" />
                  <label className="active" htmlFor="grid_width">Largeur de la grille (cases)</label>
                </div>
                <div className="input-field col s6">
                  <input placeholder="10" type="number" onChange={this.changeRect} value={this.state.height} min="0" max="100" step="1" id="grid_height" ref="gridHeightInput" />
                  <label className="active" htmlFor="grid_height">Hauteur de la grille (cases)</label>
                </div>
                <div className="input-field col s6">
                  <input placeholder="10" type="number" onChange={this.changeRect} value={this.state.tileSize} min="0" max="20" step="1" id="grid_tilesize" ref="gridTilesizeInput" />
                  <label className="active" htmlFor="grid_tilesize">Taille des cases (cm)</label>
                </div>
              </div>
            </div>
            ) : (
            <div className="card-content">
              <h4>Propriétés</h4>
              <p>Hauteur: { this.state.height * this.state.tileSize } cm ({ this.state.height } cases)</p>
              <p>Largeur: { this.state.width * this.state.tileSize } cm ({ this.state.width } cases)</p>
              <p>Taille des cases: { this.state.tileSize } cm</p>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  changeRect() {
    let grid = this.props.grid;
    let matrix = grid.matrix;
    let newState = {
      height: parseInt(React.findDOMNode(this.refs.gridHeightInput).value),
      width: parseInt(React.findDOMNode(this.refs.gridWidthInput).value),
      tileSize: parseInt(React.findDOMNode(this.refs.gridTilesizeInput).value)
    };

    for(let i = 0; i < newState.height; i++) {
      if(matrix[i]) {
        let delta = newState.width - matrix[i].length;
        console.log("delta for %s = %s", i, delta)
        if(delta > 0) {
          matrix[i].push(...(new Array(delta).fill(0)));
        }
        else if(delta < 0) {
          matrix[i] = matrix[i].slice(0, delta);
        }
      }
      else {
        console.log("new line");
        matrix[i] = new Array(newState.width).fill(0);
        console.log(matrix[i], newState.width);
      }
    }

    matrix = matrix.slice(0, newState.height);
    grid.matrix = matrix;
    grid.tileSize = newState.tileSize;

    this.setState(newState);
  },
  isEditing() {
    return this.context.router.isActive("grid", { action: "edit" });
  },
  statics: {
    willTransitionFrom(transition, component) {
      if(transition.path == "/grid/save") {
        component.props.flux.getActions("grid").save(component.props.grid);
        component.setState({ editing: false });
      }
      else if(component.isEditing()) {
        component.props.flux.getActions("grid").reload();
        component.refs.grid.resetState();
        component.setState({ editing: false });
      }
      else if(transition.path == "/grid/edit") {
        component.setState({ editing: true });
      }
    }
  }
});

export default GridIndexPage;
