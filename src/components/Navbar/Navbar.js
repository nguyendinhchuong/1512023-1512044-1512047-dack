import React from "react";

export default class Topbar extends React.Component {
    render() {
        return (
            <div className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-collapse navbar-collapse-1 collapse" aria-expanded="true">
                        <ul className="nav navbar-nav custom-css">
                            <li className="active">
                                <a href="/"><span className="glyphicon glyphicon-home" /> Home</a>
                            </li>
                            <li>
                                <a href="/"><span className="glyphicon glyphicon-bell" /> Notifications</a>
                            </li>
                            <li>
                                <a href="/"><span className="glyphicon glyphicon-envelope" /> Messages</a>
                            </li>
                        </ul>
                        <div className="navbar-form navbar-right">
                            <div className="form-group has-feedback search">
                                <input type="text" className="form-control-nav search custom-css" id="search" aria-describedby="search1"
                                    placeholder="Search..." />
                                <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true" />
                            </div>
                            <button className="btn btn-primary tweet" type="submit" aria-label="Left Align">
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Tweet
          </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



