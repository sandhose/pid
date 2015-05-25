import React from "react";
import moment from "moment";
import {} from "moment/locale/fr";

export default class RelativeDate extends React.Component {
    getDefaultProps() {
        return {
            timestamp: Date.now()
        };
    }

    render() {
        return <time dateTime={ moment(this.props.timestamp).format() }>{ moment(this.props.timestamp).fromNow() }</time>;
    }
}
