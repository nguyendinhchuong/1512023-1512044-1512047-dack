import React from 'react';

const FollowBox = () => {
    return (
        <div>
            <div className="panel panel-default panel-custom .follow-panel">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Who to follow
            </h3>
                    <a href="/">Refresh</a>
                    <a href="/">View all</a>
                </div>
                <div className="panel-body">
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
                </div>
                <div className="panel-footer">
                    <a href="/">
                        <span className="glyphicon glyphicon-user"></span> Find people you know
            </a>
                </div>
            </div>
        </div>
    );
};

export default FollowBox;