import React from "react";
import FollowMember from './FollowerCard'
export default class Topbar extends React.Component {
    render() {
        return (
            <div className="col-sm-3">
                <div className="panel panel-default panel-custom .follow-panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Who to follow
                        </h3>
                        <a href="/">Refresh</a>
                        <a href="/">View all</a>
                    </div>
                    <div className="panel-body">
                        <FollowMember></FollowMember>
                        <FollowMember></FollowMember>
                        <FollowMember></FollowMember>
                    </div>
                    <div className="panel-footer">
                        <a href="/">
                            <span className="glyphicon glyphicon-user"></span> Find people you know
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}