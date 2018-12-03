import React from "react";

export default class Topbar extends React.Component {
    render() {
        return (

            <div className="media">
                <div className="media-left">
                    <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                </div>
                <div className="media-body">
                    <h4 className="media-heading">Nome e cognome</h4>
                    <a href="/" className="btn btn-default btn-xs">
                        +
              <span className="glyphicon glyphicon-user"></span> Follow
            </a>
                </div>
            </div>
        );
    }
}