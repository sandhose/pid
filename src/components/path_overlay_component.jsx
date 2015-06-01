import React from "react";

export default class LandingPage extends React.Component {
    getDefaultProps() {
        return {
            grid: {
                matrix: [],
                tileSize: 10
            },
            path: [],
            onClick: () => {}
        }
    }
    render() {
        return (
            <svg height={this.props.grid.tileSize * this.props.grid.matrix.length}
                 width={this.props.grid.tileSize * this.props.grid.matrix[0].length}
                 onClick={this.props.onClick}>
                <path d={this.getPath()} stroke="#EECC33" fill="transparent" strokeWidth="5" />
            </svg>
        );
    }

    getPath() {
        let pathString = "";
        for(let i in this.props.path) {
            let p = this.props.path[i];
            if(i == 0) pathString += "M ";
            else pathString += "L ";

            pathString += ((p[0] + 0.5) * this.props.grid.tileSize) + " "
                        + ((p[1] + 0.5) * this.props.grid.tileSize) + " ";
        }
        return pathString;
    }
}
