import React from 'react';
import { Link } from "react-router-dom"

const FollowBox = () => {
    return (
        <div>
            <div className="panel panel-default panel-custom .follow-panel">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Who to follow
            </h3>
                    <Link to="/">Refresh</Link>
                    <Link to="/">View all</Link>
                </div>
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">Nome e cognome</h4>
                            <Link to="/" className="btn btn-default btn-xs">
                                +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </Link>
                        </div>
                    </div>
                    <div className="media">
                        <div className="media-left">
                            <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">Nome e cognome</h4>
                            <Link to="/" className="btn btn-default btn-xs">
                                +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </Link>
                        </div>
                    </div>
                    <div className="media">
                        <div className="media-left">
                            <img src="http://placehold.it/32x32" alt="demo" className="media-object img-circle" />
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">Nome e cognome</h4>
                            <Link to="/" className="btn btn-default btn-xs">
                                +
                  <span className="glyphicon glyphicon-user"></span> Follow
                </Link>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <Link to="/">
                        <span className="glyphicon glyphicon-user"></span> Find people you know
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FollowBox;